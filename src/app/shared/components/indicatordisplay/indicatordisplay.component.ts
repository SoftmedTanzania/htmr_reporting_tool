import {Component, Input, OnInit} from '@angular/core';
import {VisualizerService} from '../../services/visualizer.service';
import {CHART_TYPES} from './chart_types';

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
  chartTypes = CHART_TYPES;

  constructor(private visualizer: VisualizerService) {
  }

  ngOnInit() {
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
    item.chart = type;
    const chartConfiguration = {
      type: item.chart,
      title: item.title,
      xAxisType: 'ou',
      yAxisType: 'dx',
      show_labels: false
    };
    item.chartObject = this.visualizer.drawChart(this.analytics, chartConfiguration);
  }

}
