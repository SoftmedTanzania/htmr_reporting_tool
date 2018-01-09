import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VisualizerService} from '../../services/visualizer.service';
import {CHART_TYPES} from './chart_types';
import { chart } from 'highcharts';

import * as Highcharts from 'highcharts';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import * as OfflineHighchartExporting from 'highcharts/modules/offline-exporting.js';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpClientService} from '../../services/http-client.service';

HighchartsExporting(Highcharts);
OfflineHighchartExporting(Highcharts);

@Component({
  selector: 'app-indicatordisplay',
  templateUrl: './indicatordisplay.component.html',
  styleUrls: ['./indicatordisplay.component.css'],
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
      transition('notHidden <=> hidden', animate('500ms'))
    ])
  ]
})
export class IndicatordisplayComponent implements OnInit, OnDestroy {

  @Input() indicator: any;
  @Input() period: any;
  @Input() orgunit: any;
  @Input() loading: boolean = false;
  @Input() error_loaded: boolean =  false;
  @Input() tableObject: any;
  @Input() chartObject: any;
  @Input() visualizerType: any = 'table';
  @Input() analytics: any;
  @Input() charttype: any = '';
  chartTypes = CHART_TYPES;
  chart: any = null;
  current_settings: string = 'ou_dx';
  hide_other: boolean = false;
  third: string = 'Period';
  labels: boolean = false;
  show_confirmation: boolean = false;

  @ViewChild('chartTarget') chartTarget: ElementRef;
  constructor(private visualizer: VisualizerService, private http: HttpClientService) {
  }

  ngOnInit() {
    // if (this.chartObject) {
    //   setTimeout(() => {
    //     this.chart = Highcharts.chart(this.chartObject);
    //   }, 20);
    // }
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

  switchTypeLabel(x, y) {
    this.labels = !this.labels;
    this.switchType(x, y);
  }

  switchType(x, y, third = null) {
    if (third !== null) {
      this.hide_other = !this.hide_other;
    }
    this.current_settings = x + '_' + y;
    if (this.visualizerType === 'chart') {
      const chartConfiguration = {
        type: this.charttype,
        title: '',
        xAxisType: x,
        yAxisType: y,
        show_labels: this.labels
      };
      this.chartObject = this.visualizer.drawChart(this.analytics, chartConfiguration);
      if (this.chartObject) {
        setTimeout(() => {
          this.chart = Highcharts.chart(this.chartTarget.nativeElement, this.chartObject);
        }, 20);
      }
    }else if (this.visualizerType === 'table') {
      const column = [y];
      if (this.current_settings.indexOf('ou') === -1) {
        if (this.hide_other) { column.push('ou'); }
        this.third = 'Location';
      }
      if (this.current_settings.indexOf('pe') === -1) {
        if (this.hide_other) { column.push('pe'); }
        this.third = 'Period';
      }
      if (this.current_settings.indexOf('dx') === -1) {
        if (this.hide_other) { column.push('dx'); }
        this.third = 'Data';
      }
      const tableConfiguration = {
        title: '',
        rows: [x],
        columns: column,
        displayList: false,
      };
      this.tableObject = this.visualizer.drawTable(this.analytics, tableConfiguration);
    }
  }

  updateChartType(type, item) {
    this.charttype = type;
    this.current_settings = 'ou_dx';
    const chartConfiguration = {
      type: type,
      title: '',
      xAxisType: 'ou',
      yAxisType: 'dx',
      show_labels: false
    };
    this.chartObject = this.visualizer.drawChart(this.analytics, chartConfiguration);
    if (this.chartObject) {
      setTimeout(() => {
        this.chart = Highcharts.chart(this.chartTarget.nativeElement, this.chartObject);
      }, 20);
    }
    // this.cha

    this.visualizerType = 'chart';
  }

  saveToDashboard() {
    const dashboard = {
      period: this.period,
      orgunit: this.orgunit,
      loading: this.loading,
      error_loaded: this.error_loaded,
      tableObject: this.tableObject,
      chartObject: this.chartObject,
      visualizerType: this.visualizerType,
      analytics: this.analytics,
      charttype: this.charttype
    };
    this.http.postDHIS('dataStore/dashboard/' + this.makeid(), dashboard).subscribe(
      (response) => {},
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
