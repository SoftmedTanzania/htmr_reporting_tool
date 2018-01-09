import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Forms} from '../../../store/reducers/forms.reducer';
import {PeriodFilterComponent} from '../../../shared/components/period-filter/period-filter.component';
import * as formActions from '../../../store/actions/forms.actions';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers';
import * as dataActions from '../../../store/actions/ui.actions';

@Component({
  selector: 'app-report-selection',
  templateUrl: './report-selection.component.html',
  styleUrls: ['./report-selection.component.css']
})
export class ReportSelectionComponent implements OnInit {
  @Input() forms: any;
  @Input() periodType: string;
  @Input() period: any;
  @Input() orgunit: any;
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
    multiple: false,
    multiple_key: 'none', // can be control or shift
    starting_periods: [],
    starting_year: null,
    placeholder: 'Select period'
  };

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

  getDataElements() {
    let dx = [];
    for ( const section of this.selectedForm.sections) {
      for ( const item of section.items) {
        dx = [ ...dx, ...item.dataElements ];
      }
    }
    return dx.join(';');
  }

  enterData() {
    this.store.dispatch(new formActions.SetFormReady(true));
    this.store.dispatch(new dataActions.LoadReportData({pe: this.period.value, ou: this.orgunit.value, ds: this.getDataElements()}));
  }

}
