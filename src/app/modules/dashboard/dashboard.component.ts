import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../../shared/services/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboards: any[] = [];
  loading: boolean = false;
  constructor(private http: HttpClientService) { }

  ngOnInit() {
    this.loading = true;
    this.http.getDHIS('dataStore/dashboard').subscribe((data: any) => {
      for ( const dashboardId of data) {
        this.http.getDHIS('dataStore/dashboard/' + dashboardId).subscribe(
          (dashbaord: any) => {
            this.loading = false;
            dashbaord.id = dashboardId;
            this.dashboards.push(dashbaord);
          }
        );
      }
    });
  }

}
