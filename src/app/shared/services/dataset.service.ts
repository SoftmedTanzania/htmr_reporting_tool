import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from "rxjs/Observable";

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
    return Observable.create((observ) => {
      this.getSystemDHISUid().subscribe((system: any) => {
        entry.dataSet.datasetId = system.codes[0];
        this.http.postDHIS('metadata', this._prepareDataSet(entry.dataSet)).subscribe((response) => {
          entry.entryForms.forms.push(entry.dataSet);
          this.http.putDHIS('dataStore/Reporting/Entry_forms', entry.entryForms).subscribe((dataStoreResponse) => {
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

    return {
      dataSets: [{
        dataSetElements: dataSetElements,
        expiryDays: 0,
        id: dataSet.datasetId,
        indicators: [],
        legendSets: [],
        name: dataSet.name,
        openFuturePeriods: 0,
        organisationUnits: [],
        periodType: dataSet.periodType,
        timelyDays: 15
      }]
    };
  }


}
