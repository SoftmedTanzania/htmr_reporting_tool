import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {ApplicationState} from '../../../store/reducers';
import {DatasetService} from '../../../shared/services/dataset.service';
import {Form} from '../../../store/forms/form.model';
import {getCurrentCreatedForm} from '../../../store/new-form/new-form.selector';
import {Category} from '../../../store/categories/category.model';
import {DataElement} from '../../../store/reducers/forms.reducer';
import * as fromCategory from '../../../store/categories/category.selector';
import * as fromDataElements from '../../../store/data-elements/data-element.selector';


@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {

  currentForm$: Observable<Form>;
  categories$: Observable<Category[]>;
  dataElements$: Observable<DataElement[]>;
  constructor(
    private store: Store<ApplicationState>,
    private datasetService: DatasetService
  ) {
    this.currentForm$ = this.store.select(getCurrentCreatedForm);
    this.categories$ = this.store.select(fromCategory.selectAll);
    this.dataElements$ = this.store.select(fromDataElements.selectAll);
  }

  ngOnInit() {
  }


}
