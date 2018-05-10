import {Component, OnDestroy, OnInit} from '@angular/core';
import * as dataelectors from '../../store/selectors/ui.selectors';
import * as formSelectors from '../../store/selectors/forms.selectors';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/reducers';
import {Observable} from 'rxjs/Observable';
import {FormCategory, Forms} from '../../store/reducers/forms.reducer';
import {ResetState} from '../../store/actions/forms.actions';
import {LoadFormDataFail} from '../../store/actions/ui.actions';
import * as fromFrom from '../../store/forms/form.selector';
import * as fromCategory from '../../store/categories/category.selector';
import * as fromDataElement from '../../store/data-elements/data-element.selector';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {

  forms$: Observable<Forms[]>;
  loading$: Observable<boolean>;
  formloading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  dataElements$: Observable<any>;
  dataElementsList$: Observable<any>;
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
  analytics$: Observable<any>;
  chartObject$: Observable<any>;
  tableObject$: Observable<any>;
  visualizationType$: Observable<any>;
  view_saved: boolean = false;


  constructor(private store: Store<ApplicationState>) {
    this.forms$ = store.select( fromFrom.selectAll );
    this.loading$ = store.select( dataelectors.getDataLoaded );
    this.loaded$ = store.select( fromFrom.selectLoaded );
    this.formloading$ = store.select( fromFrom.selectLoading );
    this.dataElements$ = store.select( fromDataElement.selectEntities);
    this.dataElementsList$ = store.select( fromDataElement.selectAll);
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
    this.analytics$ = store.select( dataelectors.getanalytics );
    this.chartObject$ = store.select( dataelectors.getchartObject );
    this.tableObject$ = store.select( dataelectors.gettableObject );
    this.visualizationType$ = store.select( dataelectors.getvisualizerType );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetState());
  }

  viewSavedChange(view_saved) {
    this.view_saved = view_saved;
    if (view_saved) {
      this.store.dispatch(new LoadFormDataFail(''));
    }
  }

}
