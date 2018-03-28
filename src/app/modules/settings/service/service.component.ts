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
      this.services = services;
      this.setPage(1);
      this.clearVariables();
    }, (error) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = true;
      this.notify = true;
      this.loadingMessage = error;
      this.services = null;
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

  deleteService(service) {
    console.log(service);
  }


}
