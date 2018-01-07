import {Component, Input, OnInit} from '@angular/core';
import {DataElement, FormCategory, Forms} from '../../../store/reducers/forms.reducer';

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

  data: any = {};
  constructor() { }

  ngOnInit() {
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
    console.log( this.data[item.id + cat]);
    console.log(item)
  }

}
