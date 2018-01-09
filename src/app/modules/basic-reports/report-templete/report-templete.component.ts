import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers';
import {DataElement, FormCategory, Forms} from '../../../store/reducers/forms.reducer';
import {Angular2Csv} from 'angular2-csv';

@Component({
  selector: 'app-report-templete',
  templateUrl: './report-templete.component.html',
  styleUrls: ['./report-templete.component.css']
})
export class ReportTempleteComponent implements OnInit {

  @Input() form: Forms;
  @Input() dataElements: any;
  @Input() categories: FormCategory[];
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

  browserPrint() {
    window.print();
  }

  getItemFromCategories(itemId) {
    let name = '';
    for (const category of this.categories) {
      for (const item of category.items) {
        if (item.id === itemId ){
          name = item.name;
        }
      }
    }
    return name;
  }

  downloadCSV(section) {
    const data = [];
    for (const item of section.items) {
      const dataobject = {};
      dataobject['name'] = item.name.replace(',', '');
      for (const dataElem of item.dataElements) {
        const elemObject = this.dataElements[dataElem];
        const key = elemObject.categoriesItems.map((cat) => this.getItemFromCategories(cat)).join(' ');
        dataobject[key] = (this.dataObject[elemObject.id + '_' + this.period.value + '_' + this.orgunit.value])
          ? this.dataObject[elemObject.id + '_' + this.period.value + '_' + this.orgunit.value]
          : 0;
      }
      data.push(dataobject);
    }
    const options = {
      fieldSeparator: ',',
      quoteStrings: '\'',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false
    };

    new Angular2Csv(data, 'My Report', options);
  }

}
