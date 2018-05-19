import {Component, Input, OnInit} from '@angular/core';
import * as formActions from '../../store/actions/forms.actions';
import {HttpClientService} from '../../shared/services/http-client.service';

@Component({
  selector: 'app-providers-report',
  templateUrl: './providers-report.component.html',
  styleUrls: ['./providers-report.component.css']
})
export class ProvidersReportComponent implements OnInit {

  loading: boolean = false;
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
  orgunit: any = null;
  start_date: any = '';
  end_date: any = '';
  providers: any = [];
  selected_providers: any[] = [];
  values: any[] = [];
  orgunitnames: string = '';
  done_loading: boolean = false;
  data_loading: boolean = false;
  selected_providers_names: string = '';
  constructor(
    private httpClient: HttpClientService
  ) { }

  ngOnInit() {
  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  checkDate() {  }

  getProviders() {
    this.loading = true;
    this.loading_failed = false;
    this.done_loading = false;
    this.httpClient.getDHIS(`25/analytics.json?dimension=ou:LEVEL-4;${this.orgunit.value}&dimension=pe:2014&displayProperty=NAME&skipData=true`)
      .subscribe((analytics: any) => {
        const facilities = analytics.metaData.ou;
        this.httpClient.postOpenSRP('get-team-members-by-facility-uuid', facilities)
          .subscribe(( data: any[]) => {
            if ( data && data.length !== 0) {
              this.providers = data.map(d => {
                return {
                  name: d.person.display,
                  id: d.person.uuid
                };
              });
              console.log('prodviders', this.providers);
            }
            this.loading = false;
            this.loading_failed = false;
          }, (error) => {
            this.loading_failed = true;
            this.loading = false;
          });
      });

  }

  setSelectedData(data) {
    this.selected_providers = data;
    this.selected_providers_names = this.selected_providers.map(d => d.name ).join(', ');
  }

  getData() {
    this.data_loading = true;
    const chw_uuid = this.selected_providers.map(provider => provider.id);
    this.httpClient.postOpenSRP('get-chw-referrals-summary',
      {from_date: this.start_date, to_date: this.end_date, chw_uuid})
      .subscribe((data: any) => {
         this.done_loading = true;
        this.data_loading = false;
         this.values = data;
      });
  }

}
