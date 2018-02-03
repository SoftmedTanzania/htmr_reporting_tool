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

      this.mappings = [
        {
          'serviceId': 2,
          'serviceName': 'VVU/Ukimwi',
          'category': 'hiv',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 6,
              'referralIndicatorId': 1,
              'indicatorName': 'Homa za mara kwa mara',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 7,
              'referralIndicatorId': 2,
              'indicatorName': 'Kupungua uzito',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 8,
              'referralIndicatorId': 3,
              'indicatorName': 'Anaishi na mwenza mwenye VVU',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 9,
              'referralIndicatorId': 4,
              'indicatorName': 'Eneo hatarishi',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 3,
          'serviceName': 'Malaria',
          'category': 'malaria',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 10,
              'referralIndicatorId': 5,
              'indicatorName': 'Joto kupanda/homa',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 11,
              'referralIndicatorId': 6,
              'indicatorName': 'Anatapika',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 12,
              'referralIndicatorId': 7,
              'indicatorName': 'Anaharisha',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 13,
              'referralIndicatorId': 8,
              'indicatorName': 'Maumivu ya viungo',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 14,
              'referralIndicatorId': 9,
              'indicatorName': 'Viungo kulegea',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 4,
          'serviceName': 'Uzazi wa mpango',
          'category': 'fp',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 15,
              'referralIndicatorId': 15,
              'indicatorName': 'Yuko kwenye mahusiano ya kingono ila hatumii njia yoyote ya kisassa ya uzazi wa\nmpango',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 16,
              'referralIndicatorId': 16,
              'indicatorName': 'Anataka kubadili njia ya uzazi anayoumia',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 17,
              'referralIndicatorId': 17,
              'indicatorName': 'Hajaanza kiniki ya Mama na Mtoto',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 5,
          'serviceName': 'Unyanyasaji wa kijinsia',
          'category': 'gbv',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 18,
              'referralIndicatorId': 26,
              'indicatorName': 'Amehama nyumbani',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 19,
              'referralIndicatorId': 27,
              'indicatorName': 'Vidonda na makovu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 20,
              'referralIndicatorId': 28,
              'indicatorName': 'Amedhoofika',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 21,
              'referralIndicatorId': 29,
              'indicatorName': 'Anahitaji huduma Zaidi',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 22,
              'referralIndicatorId': 30,
              'indicatorName': 'Sonona (msongo wa mawazo)/ kuwa na woga mkuu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 23,
              'referralIndicatorId': 31,
              'indicatorName': 'Kutishiwa kuuawa',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 24,
              'referralIndicatorId': 32,
              'indicatorName': 'Mtoto ana ulemavu /hawezi kukaa au anatembea kwa shida',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 25,
              'referralIndicatorId': 33,
              'indicatorName': 'Mtoto hataki kurudi nyumbani/kwenda shuleni',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 26,
              'referralIndicatorId': null,
              'indicatorName': null,
              'isActive': false,
              'active': false
            }
          ],
          'active': true
        },
        {
          'serviceId': 6,
          'serviceName': 'Chakula na Lishe',
          'category': 'nutrition',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 27,
              'referralIndicatorId': 23,
              'indicatorName': 'Mtoto chini ya miaka mitano mwenye uzito pungufu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 28,
              'referralIndicatorId': 24,
              'indicatorName': 'Mtoto chini ya Mwaka mmoja asiyeongezeka uzito',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 29,
              'referralIndicatorId': 25,
              'indicatorName': 'Mwenza mlevi',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 7,
          'serviceName': 'Kujifungulia nyumbani',
          'category': 'homeDelivery',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 30,
              'referralIndicatorId': 22,
              'indicatorName': 'Mwenye dalili za utapiamlo',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 8,
          'serviceName': 'Mjamzito',
          'category': 'homeDelivery',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 31,
              'referralIndicatorId': 18,
              'indicatorName': 'Anatoka damu ukeni',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 32,
              'referralIndicatorId': 19,
              'indicatorName': 'Amevimba miguu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 33,
              'referralIndicatorId': 20,
              'indicatorName': 'Ana maumivu makali tumbo la chini au mgongo',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 34,
              'referralIndicatorId': 21,
              'indicatorName': 'Yeyote aliyejifungulia nyumbani',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 9,
          'serviceName': 'Benki ya damu',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 10,
          'serviceName': 'Radiology',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 11,
          'serviceName': 'Maabara',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 12,
          'serviceName': 'RCH',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 13,
          'serviceName': 'Wodini',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        }
      ];
      this.setPage(1);
      this.clearVariables();


      this.settingService.listReferalServices().subscribe((services) => {

        this.services = services
        this.settingService.listReferalIndicators().subscribe((indicators) => {
          this.indicators = indicators;
          this.serviceForMappings = this.prepareServiceForMapping(this.services, this.mappings, this.indicators);
        }, (errorIndicators) => {
          this.indicators = [
            {
              'referralIndicatorId': 1,
              'referralIndicatorName': 'Homa za mara kwa mara',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 2,
              'referralIndicatorName': 'Kupungua uzito',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 3,
              'referralIndicatorName': 'Anaishi na mwenza mwenye VVU',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 4,
              'referralIndicatorName': 'Eneo hatarishi',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 5,
              'referralIndicatorName': 'Joto kupanda/homa',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 6,
              'referralIndicatorName': 'Anatapika',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 7,
              'referralIndicatorName': 'Anaharisha',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 8,
              'referralIndicatorName': 'Maumivu ya viungo',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 9,
              'referralIndicatorName': 'Viungo kulegea',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 10,
              'referralIndicatorName': 'Kukohoa kwa Zaidi ya wiki mbili (kwa watu wasio na VVU)',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 11,
              'referralIndicatorName': 'Kikohozi cha muda wowote (Kwa wagonjwa wa VVU)',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 12,
              'referralIndicatorName': 'Homa',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 13,
              'referralIndicatorName': 'Kutoka jasho jingi wakati amelala',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 14,
              'referralIndicatorName': 'Hahitaji kupata mtoto siku za karibuni',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 15,
              'referralIndicatorName': 'Yuko kwenye mahusiano ya kingono ila hatumii njia yoyote ya kisassa ya uzazi wa\nmpango',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 16,
              'referralIndicatorName': 'Anataka kubadili njia ya uzazi anayoumia',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 17,
              'referralIndicatorName': 'Hajaanza kiniki ya Mama na Mtoto',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 18,
              'referralIndicatorName': 'Anatoka damu ukeni',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 19,
              'referralIndicatorName': 'Amevimba miguu',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 20,
              'referralIndicatorName': 'Ana maumivu makali tumbo la chini au mgongo',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 21,
              'referralIndicatorName': 'Yeyote aliyejifungulia nyumbani',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 22,
              'referralIndicatorName': 'Mwenye dalili za utapiamlo',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 23,
              'referralIndicatorName': 'Mtoto chini ya miaka mitano mwenye uzito pungufu',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 24,
              'referralIndicatorName': 'Mtoto chini ya Mwaka mmoja asiyeongezeka uzito',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 25,
              'referralIndicatorName': 'Mwenza mlevi',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 26,
              'referralIndicatorName': 'Amehama nyumbani',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 27,
              'referralIndicatorName': 'Vidonda na makovu',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 28,
              'referralIndicatorName': 'Amedhoofika',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 29,
              'referralIndicatorName': 'Anahitaji huduma Zaidi',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 30,
              'referralIndicatorName': 'Sonona (msongo wa mawazo)/ kuwa na woga mkuu',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 31,
              'referralIndicatorName': 'Kutishiwa kuuawa',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 32,
              'referralIndicatorName': 'Mtoto ana ulemavu /hawezi kukaa au anatembea kwa shida',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            },
            {
              'referralIndicatorId': 33,
              'referralIndicatorName': 'Mtoto hataki kurudi nyumbani/kwenda shuleni',
              'isActive': true,
              'createdAt': 1516784297000,
              'updatedAt': '2018-01-24',
              'active': true
            }
          ];

          this.serviceForMappings = this.prepareServiceForMapping(this.services, this.mappings, this.indicators);
        });

      }, (errorServices) => {

        this.services = [
          {
            'referralServiceId': 2,
            'referralServiceName': 'VVU/Ukimwi',
            'referralCategoryName': 'hiv',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 3,
            'referralServiceName': 'Malaria',
            'referralCategoryName': 'malaria',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 4,
            'referralServiceName': 'Uzazi wa mpango',
            'referralCategoryName': 'fp',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 5,
            'referralServiceName': 'Unyanyasaji wa kijinsia',
            'referralCategoryName': 'gbv',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 6,
            'referralServiceName': 'Chakula na Lishe',
            'referralCategoryName': 'nutrition',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 7,
            'referralServiceName': 'Kujifungulia nyumbani',
            'referralCategoryName': 'homeDelivery',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 8,
            'referralServiceName': 'Mjamzito',
            'referralCategoryName': 'homeDelivery',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 9,
            'referralServiceName': 'Benki ya damu',
            'referralCategoryName': 'other',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 10,
            'referralServiceName': 'Radiology',
            'referralCategoryName': 'other',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 11,
            'referralServiceName': 'Maabara',
            'referralCategoryName': 'other',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 12,
            'referralServiceName': 'RCH',
            'referralCategoryName': 'other',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          },
          {
            'referralServiceId': 13,
            'referralServiceName': 'Wodini',
            'referralCategoryName': 'other',
            'isActive': true,
            'createdAt': 1516784300000,
            'updatedAt': '2018-01-24',
            'active': true
          }
        ];
      });

    }, (error) => {

      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
      this.notify = true;
      this.loadingMessage = 'Mappings loaded successfully';

      this.mappings = [
        {
          'serviceId': 2,
          'serviceName': 'VVU/Ukimwi',
          'category': 'hiv',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 6,
              'referralIndicatorId': 1,
              'indicatorName': 'Homa za mara kwa mara',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 7,
              'referralIndicatorId': 2,
              'indicatorName': 'Kupungua uzito',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 8,
              'referralIndicatorId': 3,
              'indicatorName': 'Anaishi na mwenza mwenye VVU',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 9,
              'referralIndicatorId': 4,
              'indicatorName': 'Eneo hatarishi',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 3,
          'serviceName': 'Malaria',
          'category': 'malaria',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 10,
              'referralIndicatorId': 5,
              'indicatorName': 'Joto kupanda/homa',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 11,
              'referralIndicatorId': 6,
              'indicatorName': 'Anatapika',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 12,
              'referralIndicatorId': 7,
              'indicatorName': 'Anaharisha',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 13,
              'referralIndicatorId': 8,
              'indicatorName': 'Maumivu ya viungo',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 14,
              'referralIndicatorId': 9,
              'indicatorName': 'Viungo kulegea',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 4,
          'serviceName': 'Uzazi wa mpango',
          'category': 'fp',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 15,
              'referralIndicatorId': 15,
              'indicatorName': 'Yuko kwenye mahusiano ya kingono ila hatumii njia yoyote ya kisassa ya uzazi wa\nmpango',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 16,
              'referralIndicatorId': 16,
              'indicatorName': 'Anataka kubadili njia ya uzazi anayoumia',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 17,
              'referralIndicatorId': 17,
              'indicatorName': 'Hajaanza kiniki ya Mama na Mtoto',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 5,
          'serviceName': 'Unyanyasaji wa kijinsia',
          'category': 'gbv',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 18,
              'referralIndicatorId': 26,
              'indicatorName': 'Amehama nyumbani',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 19,
              'referralIndicatorId': 27,
              'indicatorName': 'Vidonda na makovu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 20,
              'referralIndicatorId': 28,
              'indicatorName': 'Amedhoofika',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 21,
              'referralIndicatorId': 29,
              'indicatorName': 'Anahitaji huduma Zaidi',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 22,
              'referralIndicatorId': 30,
              'indicatorName': 'Sonona (msongo wa mawazo)/ kuwa na woga mkuu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 23,
              'referralIndicatorId': 31,
              'indicatorName': 'Kutishiwa kuuawa',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 24,
              'referralIndicatorId': 32,
              'indicatorName': 'Mtoto ana ulemavu /hawezi kukaa au anatembea kwa shida',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 25,
              'referralIndicatorId': 33,
              'indicatorName': 'Mtoto hataki kurudi nyumbani/kwenda shuleni',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 26,
              'referralIndicatorId': null,
              'indicatorName': null,
              'isActive': false,
              'active': false
            }
          ],
          'active': true
        },
        {
          'serviceId': 6,
          'serviceName': 'Chakula na Lishe',
          'category': 'nutrition',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 27,
              'referralIndicatorId': 23,
              'indicatorName': 'Mtoto chini ya miaka mitano mwenye uzito pungufu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 28,
              'referralIndicatorId': 24,
              'indicatorName': 'Mtoto chini ya Mwaka mmoja asiyeongezeka uzito',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 29,
              'referralIndicatorId': 25,
              'indicatorName': 'Mwenza mlevi',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 7,
          'serviceName': 'Kujifungulia nyumbani',
          'category': 'homeDelivery',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 30,
              'referralIndicatorId': 22,
              'indicatorName': 'Mwenye dalili za utapiamlo',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 8,
          'serviceName': 'Mjamzito',
          'category': 'homeDelivery',
          'isActive': true,
          'indicators': [
            {
              'referralServiceIndicatorId': 31,
              'referralIndicatorId': 18,
              'indicatorName': 'Anatoka damu ukeni',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 32,
              'referralIndicatorId': 19,
              'indicatorName': 'Amevimba miguu',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 33,
              'referralIndicatorId': 20,
              'indicatorName': 'Ana maumivu makali tumbo la chini au mgongo',
              'isActive': true,
              'active': true
            },
            {
              'referralServiceIndicatorId': 34,
              'referralIndicatorId': 21,
              'indicatorName': 'Yeyote aliyejifungulia nyumbani',
              'isActive': true,
              'active': true
            }
          ],
          'active': true
        },
        {
          'serviceId': 9,
          'serviceName': 'Benki ya damu',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 10,
          'serviceName': 'Radiology',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 11,
          'serviceName': 'Maabara',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 12,
          'serviceName': 'RCH',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        },
        {
          'serviceId': 13,
          'serviceName': 'Wodini',
          'category': 'other',
          'isActive': true,
          'indicators': [],
          'active': true
        }
      ];
      this.setPage(1);
      this.clearVariables();

      this.indicators = [
        {
          'referralIndicatorId': 1,
          'referralIndicatorName': 'Homa za mara kwa mara',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 2,
          'referralIndicatorName': 'Kupungua uzito',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 3,
          'referralIndicatorName': 'Anaishi na mwenza mwenye VVU',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 4,
          'referralIndicatorName': 'Eneo hatarishi',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 5,
          'referralIndicatorName': 'Joto kupanda/homa',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 6,
          'referralIndicatorName': 'Anatapika',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 7,
          'referralIndicatorName': 'Anaharisha',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 8,
          'referralIndicatorName': 'Maumivu ya viungo',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 9,
          'referralIndicatorName': 'Viungo kulegea',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 10,
          'referralIndicatorName': 'Kukohoa kwa Zaidi ya wiki mbili (kwa watu wasio na VVU)',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 11,
          'referralIndicatorName': 'Kikohozi cha muda wowote (Kwa wagonjwa wa VVU)',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 12,
          'referralIndicatorName': 'Homa',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 13,
          'referralIndicatorName': 'Kutoka jasho jingi wakati amelala',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 14,
          'referralIndicatorName': 'Hahitaji kupata mtoto siku za karibuni',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 15,
          'referralIndicatorName': 'Yuko kwenye mahusiano ya kingono ila hatumii njia yoyote ya kisassa ya uzazi wa\nmpango',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 16,
          'referralIndicatorName': 'Anataka kubadili njia ya uzazi anayoumia',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 17,
          'referralIndicatorName': 'Hajaanza kiniki ya Mama na Mtoto',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 18,
          'referralIndicatorName': 'Anatoka damu ukeni',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 19,
          'referralIndicatorName': 'Amevimba miguu',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 20,
          'referralIndicatorName': 'Ana maumivu makali tumbo la chini au mgongo',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 21,
          'referralIndicatorName': 'Yeyote aliyejifungulia nyumbani',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 22,
          'referralIndicatorName': 'Mwenye dalili za utapiamlo',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 23,
          'referralIndicatorName': 'Mtoto chini ya miaka mitano mwenye uzito pungufu',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 24,
          'referralIndicatorName': 'Mtoto chini ya Mwaka mmoja asiyeongezeka uzito',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 25,
          'referralIndicatorName': 'Mwenza mlevi',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 26,
          'referralIndicatorName': 'Amehama nyumbani',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 27,
          'referralIndicatorName': 'Vidonda na makovu',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 28,
          'referralIndicatorName': 'Amedhoofika',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 29,
          'referralIndicatorName': 'Anahitaji huduma Zaidi',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 30,
          'referralIndicatorName': 'Sonona (msongo wa mawazo)/ kuwa na woga mkuu',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 31,
          'referralIndicatorName': 'Kutishiwa kuuawa',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 32,
          'referralIndicatorName': 'Mtoto ana ulemavu /hawezi kukaa au anatembea kwa shida',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralIndicatorId': 33,
          'referralIndicatorName': 'Mtoto hataki kurudi nyumbani/kwenda shuleni',
          'isActive': true,
          'createdAt': 1516784297000,
          'updatedAt': '2018-01-24',
          'active': true
        }
      ];
      this.services = [
        {
          'referralServiceId': 2,
          'referralServiceName': 'VVU/Ukimwi',
          'referralCategoryName': 'hiv',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 3,
          'referralServiceName': 'Malaria',
          'referralCategoryName': 'malaria',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 4,
          'referralServiceName': 'Uzazi wa mpango',
          'referralCategoryName': 'fp',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 5,
          'referralServiceName': 'Unyanyasaji wa kijinsia',
          'referralCategoryName': 'gbv',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 6,
          'referralServiceName': 'Chakula na Lishe',
          'referralCategoryName': 'nutrition',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 7,
          'referralServiceName': 'Kujifungulia nyumbani',
          'referralCategoryName': 'homeDelivery',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 8,
          'referralServiceName': 'Mjamzito',
          'referralCategoryName': 'homeDelivery',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 9,
          'referralServiceName': 'Benki ya damu',
          'referralCategoryName': 'other',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 10,
          'referralServiceName': 'Radiology',
          'referralCategoryName': 'other',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 11,
          'referralServiceName': 'Maabara',
          'referralCategoryName': 'other',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 12,
          'referralServiceName': 'RCH',
          'referralCategoryName': 'other',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        },
        {
          'referralServiceId': 13,
          'referralServiceName': 'Wodini',
          'referralCategoryName': 'other',
          'isActive': true,
          'createdAt': 1516784300000,
          'updatedAt': '2018-01-24',
          'active': true
        }
      ];
      this.serviceForMappings = this.prepareServiceForMapping(this.services, this.mappings, this.indicators);


    });


  }

  prepareServiceForMapping(services, mappings, indicators): Array<MappedService> {
    const mappedServices: Array<MappedService> = [];

    services.forEach((service => {
      const newIndicators: Array<MappingIndicator> = [];
      const singleService =
        {
          serviceId: service.referralServiceId,
          serviceName: service.referralServiceName,
          indicators: [],
          wasMapped: false
        }

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

  deleteService(service) {

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

}
