import {Component, Input, OnInit} from '@angular/core';
import {DataElement, FormCategory, Forms} from '../../../store/reducers/forms.reducer';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers';
import * as dataActions from '../../../store/actions/ui.actions';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  @Input() form: Forms;
  @Input() dataElements: DataElement;
  @Input() categories: FormCategory;
  @Input() form_data: any;
  @Input() data_loaded: boolean = false;
  @Input() data_loading: boolean = false;
  @Input() period: any;
  @Input() orgunit: any;
  @Input() dataObject: any;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  getOrgUnitName() {
    return this.orgunit.items.map((ou) => ou.name).join(', ');
  }

  getPeriodName() {
    return this.period.items.map((ou) => ou.name).join(', ');
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

  getItems(categories) {
    let cats = [];
    if ( categories.length === 1 ) {
      cats = categories[0].items.map((it) => it.id);
    }
    if ( categories.length === 2 ) {
      for (let i = 0; i < categories[0].items.length; i++) {
        for (let j = 0; j < categories[1].items.length; j++) {
          cats.push(categories[0].items[i].id + '_' + categories[1].items[j].id);
        }
      }
    }
    if ( categories.length === 3 ) {
      for (let i = 0; i < categories[0].items.length; i++) {
        for (let j = 0; j < categories[1].items.length; j++) {
          for (let k = 0; k < categories[2].items.length; k++) {
            cats.push(categories[0].items[i].id + '_' + categories[1].items[j].id + '_' + categories[2].items[k].id);
          }
        }
      }
    }
    return cats;
  }

  saveData(item, cat) {
    const key = cat + '_' + this.period.value + '_' + this.orgunit.value;
    const dataElement = this.dataElements[cat];
    if (dataElement) {
      const dataValue = {
        dataValues: [{
          dataElement: dataElement.id,
          period: this.period.value,
          orgUnit: this.orgunit.value,
          value: (this.dataObject[key]) ? this.dataObject[key] : 0
        }]
      };
      console.log(dataValue);
      this.store.dispatch(new dataActions.SaveFormData(dataValue));
    }

  }

}
