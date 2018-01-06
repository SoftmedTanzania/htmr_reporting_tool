import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadForms} from '../../store/actions/forms.actions';
import * as formSelectors from '../../store/selectors/forms.selectors';
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
  dataElements$: Observable<DataElement[]>;
  categories$: Observable<FormCategory[]>;
  selectedForm$: Observable<Forms>;
  period$: Observable<any>;
  orgunit$: Observable<any>;
  periodType$: Observable<string>

  orgunit_tree_config: any = {
    show_search : true,
    search_text : 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Locations...',
    multiple: false,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select Location'
  };

  @ViewChild(PeriodFilterComponent)
  public periodComponent: PeriodFilterComponent;

  constructor(private store: Store<ApplicationState>) {
    store.dispatch(new LoadForms());
    this.forms$ = store.select( formSelectors.getFormsList );
    this.loading$ = store.select( formSelectors.getFormsLoading );
    this.loaded$ = store.select( formSelectors.getFormsLoaded );
    this.dataElements$ = store.select( formSelectors.getDataelementsList );
    this.categories$ = store.select( formSelectors.getCategoriesList );
    this.selectedForm$ = store.select( formSelectors.getSelectedForm );
    this.orgunit$ = store.select( formSelectors.getOrgunit );
    this.period$ = store.select( formSelectors.getPeriod );
    this.periodType$ = store.select( formSelectors.getPeriodType );
  }

  ngOnInit() {
  }

  updateSelectedForm(formId) {
    this.store.dispatch(new formActions.SetActiveForm(formId));
    if (formId !== '') {
      setTimeout(() => {
        this.periodComponent.loadPeriods();
      })
    }
  }

  updatePeriod(period) {
    this.store.dispatch(new formActions.SetPeriod(period));
  }

  changeOrgUnit(orgunit) {
    this.store.dispatch(new formActions.SetOrgUnit(orgunit));
  }

}
