import {Component, Input, OnInit} from '@angular/core';
import {Form} from '../../../../store/forms/form.model';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store/reducers';
import {Category} from '../../../../store/categories/category.model';
import {DataElement} from '../../../../store/reducers/forms.reducer';
import * as formActions from '../../../../store/new-form/new-form.actions';
import * as dataElementActions from '../../../../store/data-elements/date-element.actions';
import {HttpClientService} from '../../../../shared/services/http-client.service';
import * as _ from 'lodash';
import {UpsertForm, UpsertForms} from '../../../../store/forms/form.actions';
import {ClearNewForms, UpsertNewForm} from '../../../../store/new-form/new-form.actions';
import {Go} from '../../../../store/actions/router.action';

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.css']
})
export class FormItemsComponent implements OnInit {
  @Input() form: Form;
  @Input() forms: Form[];
  @Input() categories: Category[] = [];
  @Input() dataElements: DataElement[] = [];
  saving_data = false;
  saving_data_message = 'Saving form Information...';
  error_saving_data = false;
  newItem: any = {};
  totalActions = 0;
  doneActions = 0;
  constructor(
    private store: Store<ApplicationState>,
    private httpService: HttpClientService
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

  setSectionTitle(section, event) {
    const value = event.target.value;
    const sections = [...this.form.sections];
    const sectionIndex = sections.map(item => item.id).indexOf(section.id);
    sections[sectionIndex] = {
      ...this.form.sections[sectionIndex],
      name: value
    };
    const formChanges: Form = {
      ...this.form,
      sections
    };
    this.updateForm(formChanges);
    event.stopPropagation();
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

  cancel() {
    this.store.dispatch(new ClearNewForms());
    this.store.dispatch(new Go({path: ['home', 'forms', 'list']}));
  }

  saveForm() {
    const dataElements = [];
    this.saving_data = true;
    // getting dataelements for this form only
    this.form.sections.forEach(section => {
      section.items.forEach(section_item => {
        dataElements.push(...section_item.dataElements);
      });
    });
    this.totalActions = dataElements.length + 2;
    this.store.dispatch(new UpsertForm({
      form: {
        id: this.form.id,
        changes: {
          ...this.form
        }
      }
    }));

    // setTimeout(() => this.save_form(), 1000);
    // saving dataelements for this form
    let count = 0;
    this.dataElements.forEach(dataElement => {
      if ( dataElements.indexOf(dataElement.id ) !== -1) {
        this.httpService.getDHIS(`dataElements/${dataElement.id}`).subscribe(result => {
          this.httpService.putDHIS(`dataElements/${dataElement.id}`, this.prepareDataElementPayload(dataElement))
            .subscribe(success => {
              console.log('succesfull update', dataElement.name);
              this.saving_data_message = 'Done saving ' + dataElement.name;
              this.doneActions += 1;
              count ++;
                if (count === dataElements.length ) {
                  this.save_form(dataElements);
                }
              },
                error1 => {
                  count++;
                  if (count === dataElements.length ) {
                    this.save_form(dataElements);
                  }
                }
            );
        }, error => {
          console.log(error);
          this.httpService.postDHIS('dataElements', this.prepareDataElementPayload(dataElement))
            .subscribe(success => {
                console.log('succesfull added', dataElement.name);
                this.saving_data_message = 'Done saving ' + dataElement.name;
                this.doneActions += 1;
                count++;
                if (count === dataElements.length ) {
                  this.save_form(dataElements);
                }
              },
                error1 => {
                  count++;
                  if (count === dataElements.length ) {
                    this.save_form(dataElements);
                  }
                }
            );
        });
      }

      // this.httpService.postDHIS('27/schemas/dataElement', this.prepareDataElementPayload(dataElement))
      //   .subscribe((data: any) => {
      //     console.log(dataElement.name, data);
      //   });
    });
  }

  save_form(dataElements) {
    const dataStore = {
      forms: this.forms,
      dataElements: this.dataElements,
      categories: this.categories
    };
    this.saving_data_message = 'saving form information';
    this.httpService.postDHIS('27/metadata', this.prepareDataset(dataElements))
      .subscribe((done) => {
        this.doneActions += 1;
        this.saving_data_message = 'saving configuration details';
        this.httpService.putDHIS('dataStore/Reporting/Entry_forms', dataStore)
          .subscribe((dataSaved) => {
            this.doneActions += 1;
            this.saving_data_message = 'Done saving form redirecting...';
            setTimeout(() => this.cancel(), 3000);
          });
      });
    // this.cancel();
  }

  prepareDataElementPayload(dx: DataElement) {
    // return {
    //   'aggregationType': 'SUM',
    //   'domainType': 'AGGREGATE',
    //   'valueType': 'NUMBER',
    //   'name': dx.name,
    //   'shortName': 'some test',
    //   'id': dx.id,
    //   'legendSets': []
    // };
    return {
      'aggregationType': 'SUM',
      'domainType': 'AGGREGATE',
      'publicAccess': 'rw------',
      'lastUpdated': '2018-05-01T19:54:25.366',
      'valueType': 'NUMBER',
      'id': dx.id,
      'created': '2018-02-03T16:38:55.736',
      'attributeValues': [],
      'zeroIsSignificant': false,
      'name': dx.name,
      'shortName': dx.id,
      'categoryCombo': {
        'id': 'bjDvmb4bfuf'
      },
      'lastUpdatedBy': {
        'id': 'M5zQapPyTZI'
      },
      'user': {
        'id': 'M5zQapPyTZI'
      },
      'translations': [],
      'userGroupAccesses': [],
      'userAccesses': [],
      'legendSets': [],
      'aggregationLevels': []
    };
  }

  prepareDataset(dataElemets: string[]) {
    return {
      'dataSets': [
      {
        'validCompleteOnly': false,
        'publicAccess': 'rw------',
        'skipOffline': false,
        'lastUpdated': '2018-06-05T11:29:24.171',
        'id': this.form.datasetId,
        'created': '2018-05-04T07:17:25.737',
        'attributeValues': [],
        'version': 1,
        'timelyDays': 15,
        'name': this.form.name,
        'shortName': this.form.id,
        'dataElementDecoration': false,
        'notifyCompletingUser': false,
        'noValueRequiresComment': false,
        'fieldCombinationRequired': false,
        'renderHorizontally': false,
        'renderAsTabs': false,
        'mobile': false,
        'periodType': this.form.periodType,
        'openFuturePeriods': 3,
        'expiryDays': 0,
        'categoryCombo': {
          'id': 'bjDvmb4bfuf'
        },
        'lastUpdatedBy': {
          'id': 'M5zQapPyTZI'
        },
        'user': {
          'id': 'M5zQapPyTZI'
        },
        'dataSetElements': dataElemets.map((dx) => {
          return {
            'dataSet': {
              'id': this.form.datasetId
            },
            'categoryCombo': {
              'id': 'bjDvmb4bfuf',
              'displayName': 'default'
            },
            'dataElement': {
              'id': dx
            }
          };
        }),
        'translations': [],
        'dataInputPeriods': [],
        'userGroupAccesses': [],
        'indicators': [],
        'userAccesses': [],
        'legendSets': [],
        'compulsoryDataElementOperands': [],
        'organisationUnits': [
          {
            'id': 'xd2Rxi91ZTD'
          },
          {
            'id': 'VN8Jjz61jOE'
          },
          {
            'id': 'SuoqM5pXPWG'
          }
        ]
      }
    ]
    };
  }

  createNewSection() {
    const new_section = {
      id: this.makeid(),
      categories: [],
      name: '',
      items: []
    };
    const form_sections = {
      ...this.form,
      sections: [...this.form.sections, new_section]
    };
    this.updateForm(form_sections);
  }
}
