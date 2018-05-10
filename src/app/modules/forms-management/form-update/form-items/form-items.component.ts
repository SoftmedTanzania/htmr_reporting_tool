import {Component, Input, OnInit} from '@angular/core';
import {Form} from '../../../../store/forms/form.model';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store/reducers';
import {Category} from '../../../../store/categories/category.model';
import {DataElement} from '../../../../store/reducers/forms.reducer';

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.css']
})
export class FormItemsComponent implements OnInit {
  @Input() form: Form;
  @Input() categories: Category[] = [];
  @Input() dataElements: DataElement[] = [];
  constructor(
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
  }


  selectFormName(value) {
    console.log(value);
  }

  selectPeriodType(value) {
    console.log(value);
  }

}
