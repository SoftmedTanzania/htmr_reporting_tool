import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as dataActions from '../../../store/actions/ui.actions';
import * as formActions from '../../../store/actions/forms.actions';
import {PeriodFilterComponent} from '../../../shared/components/period-filter/period-filter.component';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers';
import {Forms} from '../../../store/reducers/forms.reducer';
import {HttpClientService} from '../../../shared/services/http-client.service';
import * as _ from 'lodash';

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
    multiple: true,
    multiple_key: 'control', // can be control or shift
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
  viewsaved = false;
  dashboard_ready = false;
  saved_reports = [];
  dashboard = null;
  @Output() onViewSavedChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private store: Store<ApplicationState>,
    private http: HttpClientService
  ) { }

  ngOnInit() {
    this.http.getDHIS('dataStore/dashboard').subscribe((data: any) => {
      for ( const dashboardId of data) {
        this.http.getDHIS('dataStore/dashboard/' + dashboardId).subscribe(
          (dashbaord: any) => {
            dashbaord.id = dashboardId;
            this.saved_reports.push(dashbaord);
          }
        );
      }
    });
  }

  loadSavedReport(id) {
    this.dashboard = _.find(this.saved_reports, {id});
    this.dashboard_ready = true;
  }

  changeViewReport() {
    this.viewsaved = !this.viewsaved;
    this.dashboard_ready = false;
    this.onViewSavedChange.emit(this.viewsaved);
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
