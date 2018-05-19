import {Component, Input, OnInit} from '@angular/core';
import {Form} from '../../../../store/forms/form.model';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store/reducers';
import {Category} from '../../../../store/categories/category.model';
import {DataElement} from '../../../../store/reducers/forms.reducer';
import * as formActions from '../../../../store/new-form/new-form.actions';
import * as dataElementActions from '../../../../store/data-elements/date-element.actions';

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.css']
})
export class FormItemsComponent implements OnInit {
  @Input() form: Form;
  @Input() categories: Category[] = [];
  @Input() dataElements: DataElement[] = [];
  newItem: any = {};
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
  }


  selectFormName(value) {
    this.updateForm({name: value});
  }

  selectPeriodType(value) {
    this.updateForm({periodType: value});
  }

  getColSpan(n, categories) {
    if ( categories.length === n ) {
      return 1;
    } else if (categories.length === (n + 1)) {
      return categories[n].items.length;
    }else if (categories.length === (n + 2)) {
      return categories[n].items.length * categories[n + 1].items.length;
    }else {
      return 1;
    }
  }

  selectCategory(category, section) {
    if ( section.categories.indexOf(category.id) === -1 ) {
      const dataElements = [];
      section.categories.push(category.id);
      section.items.forEach(secItem => {
        category.items.forEach(d => {
          const dx = {
            id: this.makeid(),
            name: secItem.name + ' ' + d.name,
            categories: [category.id],
            categoriesItems: [d.id]
          };
          dataElements.push(dx);
          secItem.dataElements.push(dx.id);
        });
      });
      dataElements.forEach((dataElement) => {
        this.updateDataElement(dataElement.id, dataElement);
      });
    } else {
      const dataElmentsToRemove = this.getCorrespondingElement(category);
      section.items.forEach((section_item) => {
        section_item.dataElements.forEach((sitem) => {
          if ( dataElmentsToRemove.indexOf(sitem) !== -1 ) {
            section_item.dataElements.splice(section_item.dataElements.indexOf(sitem), 1);
            this.store.dispatch(new dataElementActions.DeleteDateElement({id: sitem}));
          }
        });
      });
      section.categories.splice(section.categories.indexOf(category.id), 1);
    }
    const sectionIndex = this.form.sections.map(item => item.id).indexOf(section.id);
    const sections = [...this.form.sections];
    sections[sectionIndex] = section;

    const formChanges: Form = {
      ...this.form,
      sections
    };
    this.updateForm(formChanges);
  }

  getColSpans(section) {
    let len = 1;
    section.categoryItems.forEach(item => {
      len *= item.items.length;
    });
    return len;
  }

  setSectionTitle(section, value) {
    const sectionIndex = this.form.sections.map(item => item.id).indexOf(section.id);
    const sections = [...this.form.sections];
    sections[sectionIndex] = {
      ...this.form.sections[sectionIndex],
      name: value
    };
    const formChanges: Form = {
      ...this.form,
      sections
    };
    this.updateForm(formChanges);
  }

  setNewItem(section, name) {
    const dataElements = [];
    if ( section.categoryItems.length === 1) {
      section.categoryItems.forEach((item) => {
        dataElements.push(...item.items.map(d => {
          return {
            id: this.makeid(),
            name: name + ' ' + d.name,
            categories: [item.id],
            categoriesItems: [d.id]
          };
        }));
      });
    } if ( section.categoryItems.length === 2) {
      section.categoryItems[0].items.forEach(item1 => {
        section.categoryItems[1].items.forEach(item2 => {
          dataElements.push({
            id: this.makeid(),
            name: name + ' ' + item1.name + ' ' + item2.name,
            categories: [section.categoryItems[0].id, section.categoryItems[1].id],
            categoriesItems: [item1.id, item2.id]
          });
        });
      });
    } if ( section.categoryItems.length === 3) {
      section.categoryItems[0].items.forEach(item1 => {
        section.categoryItems[1].items.forEach(item2 => {
          section.categoryItems[2].items.forEach(item3 => {
            dataElements.push({
              id: this.makeid(),
              name: name + ' ' + item1.name + ' ' + item2.name + ' ' + item3.name,
              categories: [section.categoryItems[0].id, section.categoryItems[1].id, section.categoryItems[2].id],
              categoriesItems: [item1.id, item2.id, item3.id]
            });
          });
        });
      });
    }
    const newSection = {...section};
    newSection.items.push({
      id: this.makeid(),
      name: name,
      dataElements: dataElements.map(dx => dx.id )
    });
    const sectionIndex = this.form.sections.map(item => item.id).indexOf(newSection.id);
    const sections = [...this.form.sections];
    sections[sectionIndex] = newSection;
    const formChanges: Form = {
      ...this.form,
      sections
    };
    this.updateForm(formChanges);
    dataElements.forEach((dataElement) => {
      this.updateDataElement(dataElement.id, dataElement);
    });
    this.newItem[section.id] = '';
  }

  setSectionItemTitle(section, item, value) {
    const sectionIndex = this.form.sections.map(sectionItem => sectionItem.id).indexOf(section.id);
    const itemIndex = section.items.map(d => d.id).indexOf(item.id);
    const items = [...section.items];
    items[itemIndex] = {
      ...item,
      name: value
    };
    const sections = [...this.form.sections];
    sections[sectionIndex] = {
      ...section,
      items: [...items]
    };
    const formChanges: Form = {
      ...this.form,
      sections
    };
    this.updateForm(formChanges);
  }

  updateForm(formChanges) {
    this.store.dispatch(new formActions.UpsertNewForm({
      newForm: {
        id: this.form.id,
        changes: {
          ...formChanges
        }
      }
    }));
  }

  updateDataElement(id, dataElementChanges) {
    this.store.dispatch(new dataElementActions.UpsertDateElement({
      dateElement: {
        id,
        changes: {
          ...dataElementChanges
        }
      }
    }));
  }

  // generate a random list of Id for use as scorecard id
  makeid(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 11; i++ ) {
      text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
    }
    return text;
  }

  // get dataelement for a specific category
  getCorrespondingElement(category) {
    const dataElemets = [];
    this.dataElements.forEach((dataElement) => {
      const categories = dataElement.categories || [];
      if ( categories.indexOf(category.id) !== -1 ) {
        dataElemets.push(dataElement.id);
      }
    });
    return dataElemets;
  }

}
