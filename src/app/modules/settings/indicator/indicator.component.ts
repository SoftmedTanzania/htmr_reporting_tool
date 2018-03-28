import {Component, ElementRef, OnInit} from '@angular/core';
import {SettingsService} from '../../../shared/services/settings.service';
import {PagerService} from '../../../shared/services/pager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  indicators = [];
  pagedIndicators = [];
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
  showEditForm: boolean = false;
  showAddForm: boolean = false;
  indicatorForm: FormGroup;
  formReference: any;
  updatedIndicator: any;


  constructor(private settingService: SettingsService,
              private pagerService: PagerService,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.settingService.listReferalIndicators().subscribe((indicators) => {
      this.indicators = indicators;
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Indicators loaded successfully';
      this.clearVariables();
      this.setPage(1);
    }, (error) => {
      this.indicators = null;
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
    this.pager = this.pagerService.getPager(this.indicators.length, page);

    // get current page of items
    this.pagedIndicators = this.indicators.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onSubmit($event) {
    const data = $event.value;
    this.loading = true;
    this.loadingMessage = 'Adding new indicator';
    this.settingService.addReferalIndicators(data).subscribe((results) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Indicator added successfully';
      this.settingService.listReferalIndicators().subscribe((indicators) => {
        this.indicators = indicators.results;
        this.clearVariables();
        this.setPage(1);
      }, (error) => {

      });
    }, (error) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = true;
      this.deletingIsError = false;
      this.loadingIsError = true;
      this.notify = false;
      this.loadingMessage = error;
    });


  }

  onUpdate($event) {
    const data = $event.value;
    const id = $event.value.id;
    this.loading = true;
    this.loadingMessage = 'Updating new indicator';
    this.settingService.editReferalIndicators(data, id).subscribe((results) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Indicator updated successfully';
      this.settingService.listReferalIndicators().subscribe((indicators) => {
        this.indicators = indicators.results;
        this.clearVariables();
        this.setPage(1);
      }, (error) => {

      });
    }, (error) => {
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = true;
      this.deletingIsError = false;
      this.loadingIsError = true;
      this.notify = false;
      this.loadingMessage = error;
    });

  }

  showAddFormTemplate() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  showEditFormTemplate(indicator) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.updatedIndicator = indicator;
    this.indicatorForm = this.formBuilder.group(
      {
        id: indicator.referralIndicatorId,
        referralIndicatorName: [indicator.referralIndicatorName, Validators.required],
        isActive: [indicator.isActive]
      }
    );
  }

  submit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#addIndicatorForm');
    this.formReference.click();
  }
  submitUpdate() {
    this.formReference = this.elementRef.nativeElement.querySelector('#updateIndicatorForm');
    this.formReference.click();
  }

  closeForm() {

  }

}
