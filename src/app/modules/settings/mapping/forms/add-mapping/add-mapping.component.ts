import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MappedService} from '../../service';
import * as _ from 'lodash';
@Component({
  selector: 'app-add-mapping',
  templateUrl: './add-mapping.component.html',
  styleUrls: ['./add-mapping.component.css']
})
export class AddMappingComponent implements OnInit {
  @Input() mappingForm: FormGroup;
  @Input() indicators: any;
  @Input() services: any;
  @Output() onMappingService = new EventEmitter;
  selectedService: MappedService;
  selectedServiceId: any;
  selectedIndicatorsCount = 0;

  constructor() {

  }

  ngOnInit() {
  }

  onChangeSelection($event) {
    this.selectedService = null;
    const serviceId = +($event.target.value);
    this.selectedService = _.find(this.services, ['serviceId', serviceId]);
    this.selectedIndicatorsCount = this.getNumberOfCurrentSelected(this.selectedService.indicators);
  }

  getNumberOfCurrentSelected(indicators) {
    return indicators.reduce((sum, indicator) => {
      if (indicator.isMapped) {
        sum += 1;
      }
      return sum;
    }, 0);
  }

  selecteIndicator($event, indicator) {
    $event.preventDefault();
    this.selectedService.indicators[_.findIndex(this.selectedService.indicators, ['referralIndicatorId', indicator.referralIndicatorId])].isMapped
      = !this.selectedService.indicators[_.findIndex(this.selectedService.indicators, ['referralIndicatorId', indicator.referralIndicatorId])].isMapped;
    this.selectedIndicatorsCount = this.getNumberOfCurrentSelected(this.selectedService.indicators);
  }

  onSubmit(services) {
    this.onMappingService.emit(services);
  }

}
