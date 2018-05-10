import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import { ResetState} from '../../store/actions/forms.actions';
import * as formSelectors from '../../store/selectors/forms.selectors';
import * as dataelectors from '../../store/selectors/ui.selectors';
import {ApplicationState} from '../../store/reducers';
import { FormCategory, Forms} from '../../store/reducers/forms.reducer';
import * as fromFrom from '../../store/forms/form.selector';
import * as fromCategory from '../../store/categories/category.selector';
import * as fromDataElement from '../../store/data-elements/data-element.selector';
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit, OnDestroy {

  forms$: Observable<Forms[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  dataElements$: Observable<any>;
  categories$: Observable<FormCategory[]>;
  selectedForm$: Observable<Forms>;
  selectedFormId$: Observable<string>;
  period$: Observable<any>;
  orgunit$: Observable<any>;
  periodType$: Observable<string>;
  form_ready$: Observable<boolean>;
  form_data$: Observable<any>;
  data_loaded$: Observable<boolean>;
  data_loading: Observable<boolean>;
  data_object$: Observable<any>;


  constructor(private store: Store<ApplicationState>) {
    this.forms$ = store.select( fromFrom.selectAll );
    this.loading$ = store.select( fromFrom.selectLoading );
    this.loaded$ = store.select( fromFrom.selectLoaded );
    this.dataElements$ = store.select( fromDataElement.selectAll);
    this.categories$ = store.select( fromCategory.selectAll );
    this.selectedForm$ = store.select( fromFrom.selectCurrentForm );
    this.selectedFormId$ = store.select( fromFrom.selectCurrentId );
    this.orgunit$ = store.select( formSelectors.getOrgunit );
    this.period$ = store.select( formSelectors.getPeriod );
    this.periodType$ = store.select( formSelectors.getPeriodType );
    this.form_data$ = store.select( dataelectors.getFormData );
    this.form_ready$ = store.select( formSelectors.getFormReady );
    this.data_loaded$ = store.select( dataelectors.getDataLoaded );
    this.data_loading = store.select( dataelectors.getDataLoading );
    this.data_object$ = store.select( dataelectors.getDataObect );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetState());
  }

}
