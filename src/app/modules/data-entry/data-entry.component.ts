import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadForms} from '../../store/actions/forms.actions';
import * as formSelectors from '../../store/selectors/forms.selectors';
import * as dataelectors from '../../store/selectors/ui.selectors';
import * as formActions from '../../store/actions/forms.actions';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/reducers';
import {Observable} from 'rxjs/Observable';
import {DataElement, FormCategory, Forms} from '../../store/reducers/forms.reducer';
import {PeriodFilterComponent} from '../../shared/components/period-filter/period-filter.component';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {

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
    store.dispatch(new LoadForms());
    this.forms$ = store.select( formSelectors.getFormsList );
    this.loading$ = store.select( formSelectors.getFormsLoading );
    this.loaded$ = store.select( formSelectors.getFormsLoaded );
    this.dataElements$ = store.select( formSelectors.getDataelements);
    this.categories$ = store.select( formSelectors.getCategoriesList );
    this.selectedForm$ = store.select( formSelectors.getSelectedForm );
    this.selectedFormId$ = store.select( formSelectors.getSelectedFormID );
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



}
