import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CHART_TYPES} from '../../../shared/components/indicatordisplay/chart_types';
import {VisualizerService} from '../../../shared/services/visualizer.service';
import {HttpClientService} from '../../../shared/services/http-client.service';
import * as Highcharts from 'highcharts';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as OfflineHighchartExporting from 'highcharts/modules/offline-exporting.js';

HighchartsExporting(Highcharts);
OfflineHighchartExporting(Highcharts);

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css'],
  animations: [
    trigger('hiddenItem', [
      state('notHidden' , style({
        'transform': 'scale(1, 1)'
      })),
      state('hidden', style({
        'transform': 'scale(0.0, 0.00)',
        'visibility': 'hidden',
        'height': '0px'
      })),
      transition('notHidden <=> hidden', animate('300ms'))
    ])
  ]
})
export class DashboardItemComponent implements OnInit, OnDestroy {

  @Input() indicator: any;
  @Input() period: any;
  @Input() orgunit: any;
  @Input() loading: boolean = false;
  @Input() error_loaded: boolean =  false;
  @Input() tableObject: any;
  @Input() chartObject: any;
  @Input() visualizerType: any = 'table';
  @Input() analytics: any;
  chartTypes = CHART_TYPES;
  chart: any = null;
  current_settings: string = 'ou_dx';
  hide_other: boolean = false;
  third: string = 'Period';
  labels: boolean = false;
  show_confirmation: boolean = false;
  deleting: any = {};

  @ViewChild('chartTarget') chartTarget: ElementRef;
  constructor(private visualizer: VisualizerService, private http: HttpClientService) {
  }

  ngOnInit() {
    if (this.chartObject) {
      setTimeout(() => {
        this.chart = Highcharts.chart(this.chartTarget.nativeElement, this.chartObject);
      }, 20);
    }
  }

  getOrgUnitName() {
    return this.orgunit.items.map((ou) => ou.name).join(', ');
  }

  getPeriodName() {
    return this.period.items.map((ou) => ou.name).join(', ');
  }

  updateType(type, item) {
    this.visualizerType = type;
    if (type === 'map') {
    }

  }

  getCSV() {

  }


  saveToDashboard(dashboardId) {
    this.http.deleteDHIS('dataStore/dashboard/' + dashboardId).subscribe(
      (response) => { this.deleting[dashboardId] = true },
      (error) => {});
  }

  // generate a random list of Id for use as scorecard id
  makeid(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 11; i++ ) {
      text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
    }
    return text;
  }

  ngOnDestroy() {
    this.chart = null;
  }

}
