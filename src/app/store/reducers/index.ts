import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {uiReducer, UiState} from './ui.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromForm1 from './forms.reducer';
import {RouterStateUrl} from './router.reducer';
import {staticDataReducer, StaticDataState} from './static-data.reducer';
import {orgunitReducer, OrgunitState} from './orgunits.reducer';
import * as fromForm from '../forms/form.reducer';
import * as fromCategory from '../categories/category.reducer';
import * as fromDateElement from '../data-elements/date-element.reducer';
import * as fromNewForm from '../new-form/new-form.reducer';

export  interface ApplicationState {
  uiState: UiState;
  staticData: StaticDataState;
  orgunits: OrgunitState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  form: fromForm1.FormsState;
  forms: fromForm.State;
  category: fromCategory.State;
  dateElement: fromDateElement.State;
  newForm: fromNewForm.State;
}
export const reducers: ActionReducerMap<ApplicationState> = {
  uiState: uiReducer,
  staticData: staticDataReducer,
  orgunits: orgunitReducer,
  routerReducer: fromRouter.routerReducer,
  form: fromForm1.formReducer,
  forms: fromForm.reducer,
  category: fromCategory.reducer,
  dateElement: fromDateElement.reducer,
  newForm: fromNewForm.reducer};


export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');

export const getUiState = createFeatureSelector<UiState>('uiState');

export const getStaticData = createFeatureSelector<StaticDataState>('staticData');

export const getOrgunitState = createFeatureSelector<OrgunitState>('orgunits');

export const getFormState = createFeatureSelector<fromForm1.FormsState>('form');

export const selectFormState = createFeatureSelector<fromForm.State>('forms');

export const selectCategoryState = createFeatureSelector<fromCategory.State>('category');

export const selectDataElementState = createFeatureSelector<fromDateElement.State>('dateElement');

export const selectNewFormState = createFeatureSelector<fromNewForm.State>('newForm');

