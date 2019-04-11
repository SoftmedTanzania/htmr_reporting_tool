import { fadeIn } from './../../shared/animations/basic-animations';
import {Component, OnDestroy, OnInit, Input} from '@angular/core';
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
import { HttpClientService } from '../../shared/services/http-client.service';
import { OrgUnitService } from '../../shared/services/org-unit.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [fadeIn]
})
export class ReportsComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  orgunit: any = null;
  orgunitnames: string = '';
  reportTitle: string = '';
  showReport: boolean = false;
  start_date: any = '';
  end_date: any = '';
  done_loading: boolean = false;
  loading_failed: boolean = false;
  @Input() orgunit_tree_config: any = {
    show_search : true,
    search_text : 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organisation units...',
    multiple: true,
    multiple_key: 'control', // can be control or shift
    placeholder: 'Select Location'
  };
  reports: {
    id: string;
    name: string;
    notes: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    active: boolean
  }[] = [];
  current_report = null;
  html_data = null;
  constructor(
    private store: Store<ApplicationState>,
    private httpClient: HttpClientService,
    private orgunitService: OrgUnitService
    ) {

  }

  ngOnInit() {
    const payload = {
      from_date: '2019-04-01',
      to_date: '2019-04-08',
      facilities: ['ed7d4f8d-d770-11e8-ba9c-f23c917bb7ec','ed7d4f8d-d770-11e8-ba9c-f23c917bb7ec']
    }
    this.httpClient.getOpenSRP('available_reports')
    .subscribe((data: any) => {
      this.reports = data;
    })

  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  changeReport(report: any) {
    this.reportTitle = report.name;
    this.showReport = true;
    this.current_report = report;

  }

  ngOnDestroy() {
    this.store.dispatch(new ResetState());
  }

  viewSavedChange(view_saved) {

  }

  checkDate() {  }

  backToReports() {
    this.reportTitle = '';
    this.showReport = false;
  }

  getReport() {
    this.loading = true;
    this.loading_failed = false;
    const facilities = this.orgunitService.getLevel4OrgunitsIds(this.orgunit.visit_locations, this.orgunit.value);
    const reportUrl = this.current_report.url.replace('/opensrp/', '') + '/html';
    const from_date = this.start_date.replace('-', '/').replace('-', '/');
    const to_date = this.start_date.replace('-', '/').replace('-', '/');
    this.httpClient.postOpenSRP1(reportUrl,
      {from_date, to_date, facilities})
    .subscribe((data: any) => {
      console.log(data);
      this.html_data = data;
      this.loading = false;
      this.loading_failed = false;
    }, error => {
       console.log(error);
       this.loading = false;
       this.loading_failed = true;
    });
  }

}
