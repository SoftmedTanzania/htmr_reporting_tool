import { Injectable } from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as formsActions from '../actions/forms.actions';
import {HttpClientService} from '../../shared/services/http-client.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LoadFormsFail, LoadFormsSuccess} from '../actions/forms.actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FormsEffects {
  constructor ( private actions$: Actions, private httpClient: HttpClientService) {

  }

  @Effect()
  loadForms$ = this.actions$.ofType(formsActions.LOAD_FORMS).pipe(
    switchMap(() => {
      return this.httpClient.get('dataStore/Reporting/Entry_forms').pipe(
        map((forms) => new LoadFormsSuccess(forms)),
        catchError((error) => of(new LoadFormsFail(error)))
      );
    })
  );
}
