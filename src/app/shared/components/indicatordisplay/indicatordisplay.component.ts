import {Component, Input, OnInit} from '@angular/core';
import {VisualizerService} from '../../services/visualizer.service';
import {CHART_TYPES} from './chart_types';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-indicatordisplay',
  templateUrl: './indicatordisplay.component.html',
  styleUrls: ['./indicatordisplay.component.css']
})
export class IndicatordisplayComponent implements OnInit {

  @Input() indicator: any;
  @Input() period: any;
  @Input() orgunit: any;
  @Input() loading: boolean = false;
  @Input() error_loaded: boolean =  false;
  @Input() tableObject: any;
  @Input() chartObject: any;
  @Input() visualizerType: any = 'table';
  @Input() analytics: any;
  @Input() charttype: any = 'bar';
  chartTypes = CHART_TYPES;
  chart: any;
  constructor(private visualizer: VisualizerService) {
  }

  ngOnInit() {
    // if (this.chartObject) {
    //   setTimeout(() => {
    //     this.chart = Highcharts.chart(this.chartObject);
    //   }, 20);
    // }
  }

  updateType(type, item) {
    this.visualizerType = type;
    if (type === 'map') {
    }

  }

  getCSV(indicator) {
    if (indicator) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(indicator.csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = indicator.title + '.csv';
      hiddenElement.click();
    }

  }

  setOptions(type, item) {
  }

  updateChartType(type, item) {
    this.visualizerType = 'chart';
    this.charttype = type;
    const chartConfiguration = {
      type: type,
      renderId: 'chart',
      title: '',
      xAxisType: 'ou',
      yAxisType: 'dx',
      show_labels: false
    };
    this.chartObject = this.visualizer.drawChart(this.analytics, chartConfiguration);
    if (this.chartObject) {
      setTimeout(() => {
        // this.chart = Highcharts.chart(this.chartObject);
      }, 20);
    }
  }

}
