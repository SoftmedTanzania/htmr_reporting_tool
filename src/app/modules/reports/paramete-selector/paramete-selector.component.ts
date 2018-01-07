import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as dataActions from '../../../store/actions/ui.actions';
import * as formActions from '../../../store/actions/forms.actions';
import {PeriodFilterComponent} from '../../../shared/components/period-filter/period-filter.component';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers';
import {Forms} from '../../../store/reducers/forms.reducer';

@Component({
  selector: 'app-paramete-selector',
  templateUrl: './paramete-selector.component.html',
  styleUrls: ['./paramete-selector.component.css']
})
export class ParameteSelectorComponent implements OnInit {
  @Input() forms: any;
  @Input() periodType: string;
  @Input() period: any;
  @Input() orgunit: any;
  @Input() dataElements: any;
  @Input() selectedForm: Forms;
  @Input() selectedFormID: string;
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


  period_tree_config: any = {
    show_search : false,
    search_text : 'Search',
    level: null,
    loading: false,
    loading_message: 'Loading Periods...',
    multiple: true,
    multiple_key: 'none', // can be control or shift
    starting_periods: [],
    starting_year: null,
    placeholder: 'Select period'
  };

  selectedData: any[] = [];
  @ViewChild(PeriodFilterComponent)
  public periodComponent: PeriodFilterComponent;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  updateSelectedForm(formId) {
    this.store.dispatch(new formActions.SetActiveForm(formId));
    if (formId !== '') {
      setTimeout(() => {
        this.periodComponent.loadPeriods();
      });
    }
  }

  updatePeriod(period) {
    this.store.dispatch(new formActions.SetPeriod(period));
  }

  changeOrgUnit(orgunit) {
    this.store.dispatch(new formActions.SetOrgUnit(orgunit));
  }

  enterData() {
    this.store.dispatch(new formActions.SetFormReady(true));
    this.store.dispatch(new dataActions.LoadFlexibleReportData(
      {
        pe: this.period.value,
        ou: this.orgunit.value,
        ds: this.selectedData.map((i) => i.id).join(';')
      }));
  }

  setSelectedData(data) {
    this.selectedData = data;
  }
}
