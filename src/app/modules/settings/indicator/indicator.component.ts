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
      this.indicators = indicators.results;
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
      this.indicators = [{
        'referralIndicatorId': 1,
        'referralIndicatorName': 'Homa za mara kwa mara',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 2,
        'referralIndicatorName': 'Kupungua uzito',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 3,
        'referralIndicatorName': 'Anaishi na mwenza mwenye VVU',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 4,
        'referralIndicatorName': 'Eneo hatarishi',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 5,
        'referralIndicatorName': 'Joto kupanda/homa',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 6,
        'referralIndicatorName': 'Anatapika',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 7,
        'referralIndicatorName': 'Anaharisha',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 8,
        'referralIndicatorName': 'Maumivu ya viungo',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 9,
        'referralIndicatorName': 'Viungo kulegea',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 10,
        'referralIndicatorName': 'Kukohoa kwa Zaidi ya wiki mbili (kwa watu wasio na VVU)',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 11,
        'referralIndicatorName': 'Kikohozi cha muda wowote (Kwa wagonjwa wa VVU)',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 12,
        'referralIndicatorName': 'Homa',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 13,
        'referralIndicatorName': 'Kutoka jasho jingi wakati amelala',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 14,
        'referralIndicatorName': 'Hahitaji kupata mtoto siku za karibuni',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 15,
        'referralIndicatorName': 'Yuko kwenye mahusiano ya kingono ila hatumii njia yoyote ya kisassa ya uzazi wa\nmpango',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 16,
        'referralIndicatorName': 'Anataka kubadili njia ya uzazi anayoumia',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 17,
        'referralIndicatorName': 'Hajaanza kiniki ya Mama na Mtoto',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 18,
        'referralIndicatorName': 'Anatoka damu ukeni',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 19,
        'referralIndicatorName': 'Amevimba miguu',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 20,
        'referralIndicatorName': 'Ana maumivu makali tumbo la chini au mgongo',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 21,
        'referralIndicatorName': 'Yeyote aliyejifungulia nyumbani',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 22,
        'referralIndicatorName': 'Mwenye dalili za utapiamlo',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 23,
        'referralIndicatorName': 'Mtoto chini ya miaka mitano mwenye uzito pungufu',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 24,
        'referralIndicatorName': 'Mtoto chini ya Mwaka mmoja asiyeongezeka uzito',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 25,
        'referralIndicatorName': 'Mwenza mlevi',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 26,
        'referralIndicatorName': 'Amehama nyumbani',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 27,
        'referralIndicatorName': 'Vidonda na makovu',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 28,
        'referralIndicatorName': 'Amedhoofika',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 29,
        'referralIndicatorName': 'Anahitaji huduma Zaidi',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 30,
        'referralIndicatorName': 'Sonona (msongo wa mawazo)/ kuwa na woga mkuu',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 31,
        'referralIndicatorName': 'Kutishiwa kuuawa',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 32,
        'referralIndicatorName': 'Mtoto ana ulemavu /hawezi kukaa au anatembea kwa shida',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }, {
        'referralIndicatorId': 33,
        'referralIndicatorName': 'Mtoto hataki kurudi nyumbani/kwenda shuleni',
        'isActive': true,
        'createdAt': 1516784297000,
        'updatedAt': '2018-01-24',
        'active': true
      }];

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
