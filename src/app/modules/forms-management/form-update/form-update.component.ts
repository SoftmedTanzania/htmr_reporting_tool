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
import * as fromForm from '../../../store/forms/form.selector';
import * as fromDataElements from '../../../store/data-elements/data-element.selector';
import {Go} from '../../../store/actions/router.action';


@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {

  currentForm$: Observable<Form>;
  forms$: Observable<Form[]>;
  categories$: Observable<Category[]>;
  dataElements$: Observable<DataElement[]>;
  constructor(
    private store: Store<ApplicationState>,
    private datasetService: DatasetService
  ) {
    this.currentForm$ = this.store.select(getCurrentCreatedForm);
    this.forms$ = this.store.select(fromForm.selectAll);
    this.currentForm$.subscribe(h => {
      if (!h) {
        this.store.dispatch(new Go({path: ['home', 'forms', 'list']}));
      }
    })
    this.categories$ = this.store.select(fromCategory.selectAll);
    this.dataElements$ = this.store.select(fromDataElements.selectAll);
  }

  ngOnInit() {
  }


}
