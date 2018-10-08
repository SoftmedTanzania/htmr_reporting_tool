import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import * as formsActions from '../actions/forms.actions';
import * as dataActions from '../actions/ui.actions';
import * as formActions from '../forms/form.actions';
import * as categoryAction from '../categories/category.actions';
import * as dataElementAction from '../data-elements/date-element.actions';
import { HttpClientService } from '../../shared/services/http-client.service';
import { VisualizerService } from '../../shared/services/visualizer.service';
import { DatasetService } from '../../shared/services/dataset.service';
import { ApplicationState } from '../reducers';

@Injectable()
export class FormsEffects {
  constructor (
    private actions$: Actions,
    private httpClient: HttpClientService ,
    private visualizeService: VisualizerService,
    private dataSet: DatasetService,
    private store: Store<ApplicationState>
  ) {

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

  // @Effect({ dispatch: false })
  // loadMetadata = this.actions$.ofType(formActions.FormActionTypes.GetForms).pipe(
  //   switchMap(() => {
  //     return this.httpClient.get('dataStore/Reporting/Entry_forms').pipe(
  //       tap(formdata => {
  //         // this.store.dispatch(new formActions.LoadForms({ forms: formdata.forms}));
  //         // this.store.dispatch(new formActions.DoneGettingForms());
  //         // this.store.dispatch(new categoryAction.LoadCategories({categorys: formdata.categories}));
  //         // this.store.dispatch(new categoryAction.DoneGettingCategories());
  //         // this.store.dispatch(new dataElementAction.LoadDateElements({dateElements: formdata.dataElements}));
  //         // this.store.dispatch(new dataElementAction.DoneGettingDateElements());
  //       })
  //     );
  //   })
  // );

  @Effect()
  createForms$ = this.actions$.ofType(formsActions.CREATE_FORMS).pipe(
    switchMap((action: any) => {
      return this.dataSet.createDataSet(action.payload).pipe(
        map((forms) => new formsActions.CreateFormsSuccess(forms)),
        catchError((error) => of(new formsActions.CreateFormsFail(error)))
      );
    })
  );

  @Effect()
  deleteForms$ = this.actions$.ofType(formsActions.DELETE_FORMS).pipe(
    switchMap((action: any) => {
      return this.dataSet.deleteDataSet(action.payload).pipe(
        map((forms) => new formsActions.DeleteFormsSuccess(forms)),
        catchError((error) => of(new formsActions.DeleteFormsFail(error)))
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
  loadReportData$ = this.actions$.ofType(dataActions.LOAD_REPORT_DATA).pipe(
    map((action: dataActions.LoadFormData) => action.payload),
    switchMap((payload) => {
      return this.httpClient.get(`25/analytics.json?dimension=dx:${payload.ds}&dimension=ou:${payload.ou}&dimension=pe:${payload.pe}&displayProperty=NAME`)
        .pipe(
          map((data) => new dataActions.LoadReportDataSuccess(data)),
          catchError(error => of(new dataActions.LoadReportDataFail(error)))
        );
    })
  );

  @Effect()
  loadFlexibleReportData$ = this.actions$.ofType(dataActions.LOAD_FLEXIBLE_REPORT_DATA).pipe(
    map((action: dataActions.LoadFormData) => action.payload),
    switchMap((payload) => {
      return this.httpClient.get(`25/analytics.json?dimension=dx:${payload.ds}&dimension=ou:${payload.ou}&dimension=pe:${payload.pe}&displayProperty=NAME`)
        .pipe(
          map((data) => new dataActions.LoadFlexibleReportDataFail(data))
        );
    })
  );

  @Effect()
  loadFlexibleReportDataSuccess$ = this.actions$.ofType(dataActions.LOAD_FLEXIBLE_REPORT_DATA_FAIL).pipe(
    map((action: dataActions.LoadFlexibleReportDataFail) => {
      const chartConfiguration = {
        type: 'bar',
        title: '',
        xAxisType: 'ou',
        yAxisType: 'dx',
        show_labels: false
      };
      let columns = [];
      if (action.payload.metaData.pe.length > 1){
        columns = ['dx', 'pe'];
      } else {
        columns = ['dx'];
      }

      const tableConfiguration = {
        title: '',
        rows: ['ou'],
        columns: columns,
        displayList: false,
      };

      const objs = {
        analytics: action.payload,
        visualizerType: 'table',
        tableObject: this.visualizeService.drawTable(action.payload, tableConfiguration),
        chartObject: this.visualizeService.drawChart(action.payload, chartConfiguration)
      };
      return new dataActions.LoadFlexibleDataSuccess(objs);

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
