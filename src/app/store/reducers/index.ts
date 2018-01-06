import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {uiReducer, UiState} from './ui.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromForm from './forms.reducer';
import {RouterStateUrl} from './router.reducer';
import {staticDataReducer, StaticDataState} from './static-data.reducer';
import {orgunitReducer, OrgunitState} from './orgunits.reducer';

export  interface ApplicationState {
  uiState: UiState;
  staticData: StaticDataState;
  orgunits: OrgunitState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  forms: fromForm.FormsState;
}
export const reducers: ActionReducerMap<ApplicationState> = {
  uiState: uiReducer,
  staticData: staticDataReducer,
  orgunits: orgunitReducer,
  routerReducer: fromRouter.routerReducer,
  forms: fromForm.formReducer
};


export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');

export const getUiState = createFeatureSelector<UiState>('uiState');

export const getStaticData = createFeatureSelector<StaticDataState>('staticData');

export const getOrgunitState = createFeatureSelector<OrgunitState>('orgunits');

export const getFormState = createFeatureSelector<fromForm.FormsState>('forms');

