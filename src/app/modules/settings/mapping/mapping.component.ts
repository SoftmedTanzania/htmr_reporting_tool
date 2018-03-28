import {Component, ElementRef, OnInit} from '@angular/core';
import {SettingsService} from '../../../shared/services/settings.service';
import {PagerService} from '../../../shared/services/pager.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MappedService} from './service';
import {MappingIndicator} from './indicator';
import * as _ from 'lodash';
@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  mappings = [];
  indicators = [];
  services = [];
  showEditForm: boolean = false;
  pagedMappings = [];
  // pager object
  pager: any = {};
  loading = true;
  updating = false;
  deleting = false;
  updatingIsError = false;
  deletingIsError = false;
  loadingIsError = false;
  notify = false;
  loadingMessage = 'Loading mappings';
  formReference: any;
  searchText: any = '';
  showAddForm: boolean = false;


  serviceForMappings: Array<MappedService>;


  mappingForm: FormGroup;


  constructor(private settingService: SettingsService,
              private pagerService: PagerService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {

    this.mappingForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.settingService.listServiceIndicatorMerge().subscribe((mappings) => {

      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Mappings loaded successfully';

      this.mappings = mappings;
      this.setPage(1);
      this.clearVariables();


      this.settingService.listReferalServices().subscribe((services) => {

        this.services = services
        this.settingService.listReferalIndicators().subscribe((indicators) => {
          this.indicators = indicators;
          this.serviceForMappings = this.prepareServiceForMapping(this.services, this.mappings, this.indicators);
        }, (errorIndicators) => {
        });

      }, (errorServices) => {

      });

    }, (error) => {

      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = true;
      this.notify = true;
      this.loadingMessage = error;
    });


  }

  prepareServiceForMapping(services, mappings, indicators): Array<MappedService> {
    const mappedServices: Array<MappedService> = [];

    services.forEach((service => {
      const newIndicators: Array<MappingIndicator> = [];
      const singleService = {
          serviceId: service.referralServiceId,
          serviceName: service.referralServiceName,
          indicators: [],
          wasMapped: false
        };

      let catchedIndicators = [];
      if (_.find(mappings, ['serviceId', service.referralServiceId])) {
        catchedIndicators = _.find(mappings, ['serviceId', service.referralServiceId]).indicators;

      }

      indicators.forEach(indicator => {
        const catchedSingleIndicator = _.find(catchedIndicators, ['referralIndicatorId', indicator.referralIndicatorId]);
        if (catchedSingleIndicator) {
          singleService.indicators.push(
            {
              isMapped: true,
              referralIndicatorId: catchedSingleIndicator.referralIndicatorId,
              indicatorName: catchedSingleIndicator.indicatorName
            });
          singleService.wasMapped = true;
        } else {
          singleService.indicators.push(
            {
              isMapped: false,
              referralIndicatorId: indicator.referralIndicatorId,
              indicatorName: indicator.referralIndicatorName
            });
        }
      });
      mappedServices.push(singleService);
    }));
    return mappedServices;
  }

  showAddFormTemplate() {
    this.showAddForm = true;
  }


  /**
   * Trigger form submission
   * */
  submit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#addFormButton');
    this.formReference.click();
  }

  /**
   * Listening to form submission Event
   * */
  onSubmit(services) {
    const data = this.prepareDataMapping(services);
    if (data) {
      this.settingService.createServiceIndicatorMerge(data).subscribe((response) => {
        console.log(response);
      }, (error) => {

      });
    }

  }

  prepareDataMapping(services) {
    const dataMappingArray = [];
    services.forEach(service => {
      const serviceModel = {
        'referralServiceId': service.serviceId,
        'referralIndicatorId': []
      };
      service.indicators.forEach(indicator => {
        if (indicator.isMapped) {
          serviceModel.referralIndicatorId.push(indicator.referralIndicatorId);
        }
      });
      if (service.wasMapped || serviceModel.referralIndicatorId.length > 0) {
        dataMappingArray.push(serviceModel);
      }
    });
    return dataMappingArray;
  }

  /**
   * Close and reset the form
   * */
  closeForm() {
    this.notify = false;
    this.showAddForm = false;
    this.resetForm();
  }


  resetForm() {
    this.mappingForm.reset();
  }


  clearVariables() {

    setTimeout(() => {
      this.updatingIsError = false;
      this.updating = false;
      this.notify = false;
    }, 3000);

  }



  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.mappings.length, page);

    // get current page of items
    this.pagedMappings = this.mappings.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  search() {}
}
