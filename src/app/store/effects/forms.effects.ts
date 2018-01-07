import { Injectable } from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as formsActions from '../actions/forms.actions';
import * as dataActions from '../actions/ui.actions';
import {HttpClientService} from '../../shared/services/http-client.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FormsEffects {
  constructor ( private actions$: Actions, private httpClient: HttpClientService) {

  }

  @Effect()
  loadForms$ = this.actions$.ofType(formsActions.LOAD_FORMS).pipe(
    switchMap(() => {
      return this.httpClient.get('dataStore/Reporting/Entry_forms').pipe(
        map((forms) => new formsActions.LoadFormsSuccess(forms)),
        catchError((error) => of(new formsActions.LoadFormsFail(error)))
      );
    })
  );

  @Effect()
  loadFormData$ = this.actions$.ofType(dataActions.LOAD_FORM_DATA).pipe(
    map((action: dataActions.LoadFormData) => action.payload),
    switchMap((payload) => {
      return this.httpClient.get(`dataValueSets.json?dataSet=${payload.ds}&period=${payload.pe}&orgUnit=${payload.ou}`)
        .pipe(
          map((data) => new dataActions.LoadFormDataSuccess(data)),
          catchError(error => of(new dataActions.LoadFormDataFail(error)))
        );
    })
  );

  @Effect()
  saveFormData$ = this.actions$.ofType(dataActions.SAVE_FORM_DATA).pipe(
    map((action: dataActions.LoadFormData) => action.payload),
    switchMap((payload) => {
      return this.httpClient.postDHIS(`dataValueSets`, payload)
        .pipe(
          map((data) => new dataActions.SaveFormDataSuccess(payload)),
          catchError(error => of(new dataActions.SaveFormDataFail(error)))
        );
    })
  );
}
