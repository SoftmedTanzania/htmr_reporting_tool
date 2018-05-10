import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from "rxjs/Observable";
import * as _ from 'lodash';
export interface Dataset {
  id: string;
  name: string;
  periodType: string;
}

@Injectable()
export class DatasetService {

  _datasets: Dataset[];

  constructor(private http: HttpClientService) {

  }


  private getSystemDHISUid() {
    return this.http.getDHIS(`system/uid.json?limit=1`);
  }

  createDataSet(entry: { dataSet: any, entryForms: any }): Observable<any> {
    console.log(entry.dataSet);
    this._prepareEntryForms(entry.dataSet, entry.entryForms);
    return Observable.create((observ) => {
      this.getSystemDHISUid().subscribe((system: any) => {
        entry.dataSet.datasetId = system.codes[0];
        this.http.postDHIS('metadata', this._prepareDataSet(entry.dataSet)).subscribe((response) => {
          this.http.putDHIS('dataStore/Reporting/Entry_forms', this._prepareEntryForms(entry.dataSet, entry.entryForms)).subscribe((dataStoreResponse) => {
            observ.next(response);
            observ.complete();
          }, error => {
            observ.error(error);
          });
        }, error => {
          observ.error(error);
        });
      });

    });
  }

  deleteDataSet(entry): Observable<any> {
    return Observable.create((observ) => {

      entry.dataStore.forms.splice(_.findIndex(entry.dataStore.forms, (entryForm: any) => {
          return entry.form.datasetId === entryForm.id;
        }));
        this.http.deleteDHIS('dataSets/' + entry.dataSet.datasetId).subscribe((response) => {
          this.http.putDHIS('dataStore/Reporting/Entry_forms', entry.dataStore.forms).subscribe((dataStoreResponse) => {
            observ.next(response);
            observ.complete();
          }, error => {
            observ.error(error);
          });
        }, error => {
          observ.error(error);
        });



    });
  }

  _prepareEntryForms(newEntryForm, entryForms) {

    const formSections = [];
    newEntryForm.sections.forEach((section) => {
      const sectionItems = [];
      section.items.forEach(item => {
        sectionItems.push(
          {
            id: this.generateCode(),
            name: item.name,
            dataElements: [item.id]
          }
        );
      });

      console.log(sectionItems);
      const categories = [];
      section.categories.forEach((category) => {
        categories.push(category.id);
      });

      formSections.push(
        {
          categories: categories,
          id: section.id,
          name: section.name,
          items: sectionItems
        }
      );
      console.log(formSections);
    });

    entryForms.forms.push(
      {
        name: newEntryForm.name,
        id: newEntryForm.id,
        datasetId: newEntryForm.datasetId,
        periodType: newEntryForm.periodType,
        sections: formSections
      }
    );
    console.log(entryForms);
    return entryForms;
  }

  sample = (d = [], fn = Math.random) => {
    if (d.length === 0) return;
    return d[Math.round(fn() * (d.length - 1))];
  }

  generateCode = (limit = 11, fn = Math.random) => {
    const allowedLetters: any = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].join('');
    const allowedChars: any = ['0123456789', allowedLetters].join('');

    const arr = [this.sample(allowedLetters, fn)];

    for (let i = 0; i < limit - 1; i++) {
      arr.push(this.sample(allowedChars, fn));
    }

    return arr.join('');
  }

  private _prepareDataSet(dataSet: any) {
    let dataSetElements = [];
    dataSet.sections.forEach((section) => {
      section.items.forEach((item) => {
        dataSetElements = [
          ...dataSetElements,
          {
            id: this.generateCode(),
            dataSet: {id: dataSet.datasetId},
            categoryCombo: {},
            dataElement: {id: item.id}
          }
        ];
      });

    });
    let orgUnits = [];
    dataSet.selectedOrgUnits.forEach((orgUnit) => {
      orgUnits = [...orgUnits, {id: orgUnit.id}];
    });

    return {
      dataSets: [{
        dataSetElements: dataSetElements,
        expiryDays: 0,
        id: dataSet.datasetId,
        indicators: [],
        legendSets: [],
        name: dataSet.name,
        openFuturePeriods: 0,
        organisationUnits: orgUnits,
        periodType: dataSet.periodType,
        timelyDays: 15
      }]
    };
  }


}
