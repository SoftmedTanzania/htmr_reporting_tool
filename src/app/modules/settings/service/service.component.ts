import {Component, ElementRef, OnInit} from '@angular/core';
import {SettingsService} from '../../../shared/services/settings.service';
import {PagerService} from '../../../shared/services/pager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services = [];
  pagedServices = [];
  pager: any = {};
  loading = true;
  updating = false;
  deleting = false;
  updatingIsError = false;
  deletingIsError = false;
  loadingIsError = false;
  notify = false;
  loadingMessage = 'Loading services';
  searchText: any = '';
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  serviceForm: FormGroup;
  formReference: any;
  updatedService: any;

  constructor(private settingService: SettingsService,
              private elementRef: ElementRef,
              private pagerService: PagerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.settingService.listReferalServices().subscribe((services) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Services loaded successfully';
      this.services = services.results;
      this.setPage(1);
      this.clearVariables();
    }, (error) => {

      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Services loaded successfully';
      this.services = [{
        'referralServiceId': 1,
        'referralServiceName': 'Kifua kikuu',
        'referralCategoryName': 'tb',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 2,
        'referralServiceName': 'VVU/Ukimwi',
        'referralCategoryName': 'hiv',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 3,
        'referralServiceName': 'Malaria',
        'referralCategoryName': 'malaria',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 4,
        'referralServiceName': 'Uzazi wa mpango',
        'referralCategoryName': 'fp',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 5,
        'referralServiceName': 'Unyanyasaji wa kijinsia',
        'referralCategoryName': 'gbv',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 6,
        'referralServiceName': 'Chakula na Lishe',
        'referralCategoryName': 'nutrition',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 7,
        'referralServiceName': 'Kujifungulia nyumbani',
        'referralCategoryName': 'homeDelivery',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 8,
        'referralServiceName': 'Mjamzito',
        'referralCategoryName': 'homeDelivery',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 9,
        'referralServiceName': 'Benki ya damu',
        'referralCategoryName': 'other',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 10,
        'referralServiceName': 'Radiology',
        'referralCategoryName': 'other',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 11,
        'referralServiceName': 'Maabara',
        'referralCategoryName': 'other',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 12,
        'referralServiceName': 'RCH',
        'referralCategoryName': 'other',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }, {
        'referralServiceId': 13,
        'referralServiceName': 'Wodini',
        'referralCategoryName': 'other',
        'isActive': true,
        'createdAt': 1517647274000,
        'updatedAt': '2018-02-03',
        'active': true
      }];
      this.setPage(1);
      this.clearVariables();
    });
  }

  search() {
  }

  clearVariables() {

    setTimeout(() => {
      this.updatingIsError = false;
      this.updating = false;
      this.notify = false;
    }, 3000);

  }

  showAddFormTemplate() {
    this.showAddForm = true;
    this.showEditForm = false;
  }


  showEditFormTemplate(service) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.updatedService = service;
    this.serviceForm = this.formBuilder.group(
      {
        referralServiceId: service.referralServiceId,
        referralServiceName: [service.referralServiceName, Validators.required],
        referralCategoryName: [service.referralCategoryName, Validators.required],
        isActive: service.isActive,
      }
    );
  }


  submit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#addServiceForm');
    this.formReference.click();
  }

  submitUpdate() {
    this.formReference = this.elementRef.nativeElement.querySelector('#updateServiceForm');
    this.formReference.click();
  }


  onSubmit($event) {
    const data = $event.value;
    this.settingService.addReferalServices({
      referralServiceName: data.referralServiceName,
      referralCategoryName: data.referralCategoryName,
      isActive: data.isActive,
    }).subscribe((success) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Services added successfully';

      this.settingService.listReferalServices().subscribe((services) => {
        this.services = services.results;
        this.setPage(1);
        this.clearVariables();
      }, (error) => {
      });
    }, (error) => {
      console.log(error);
    });
  }


  onSubmitUpdate($event) {
    const data = $event.value;

    this.loading = false;
    this.updating = true;
    this.deleting = false;
    this.updatingIsError = false;
    this.deletingIsError = false;
    this.loadingIsError = false;
    this.notify = false;
    this.loadingMessage = 'Updating service';

    this.settingService.editReferalIndicators({
      referralServiceName: data.referralServiceName,
      referralCategoryName: data.referralCategoryName,
      isActive: data.isActive,
    }, data.referralServiceId).subscribe((success) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Services updated successfully';

      this.settingService.listReferalServices().subscribe((services) => {
        this.services = services.results;
        this.setPage(1);
        this.clearVariables();
      }, (error) => {
      });
    }, (error) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = true;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = false;
      this.loadingMessage = 'Updating services failed';

    });
  }


  closeForm() {

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.services.length, page);

    // get current page of items
    this.pagedServices = this.services.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  showAddFormTemplate() {

  }

}
