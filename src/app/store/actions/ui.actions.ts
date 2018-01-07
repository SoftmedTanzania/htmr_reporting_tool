import { Action } from '@ngrx/store';

export const SET_VIEW_TITLE = '[UI] Set view title';
export const SET_HOME_LOADING_PERCENT = '[UI] Set Home Loading Percent';
export const SET_VIEW_STYLE = '[UI] Set View Style';
export const LOAD_FORM_DATA = '[forms] Load Form Data';
export const LOAD_FORM_DATA_SUCCESS = '[forms] Load Form Data Success';
export const LOAD_FORM_DATA_FAIL = '[forms] Load Form Data Fail';


export class SetViewTitle implements Action {
  readonly type = SET_VIEW_TITLE;
  constructor(public payload: string) {}
}

export class SetHomeLoadingPercent implements Action {
  readonly type = SET_HOME_LOADING_PERCENT;
  constructor(public payload: number) {}
}


export class SetViewStyle implements Action {
  readonly type = SET_VIEW_STYLE;
  constructor(public payload: string) {}
}


export class LoadFormData implements Action {
  readonly type = LOAD_FORM_DATA;
  constructor(public payload: {pe: string, ou: string, ds: string}) {}
}

export class LoadFormDataSuccess implements Action {
  readonly type = LOAD_FORM_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadFormDataFail implements Action {
  readonly type = LOAD_FORM_DATA_FAIL;
  constructor(public payload: any) {}
}

export type UiActions =
  SetViewTitle
  | SetHomeLoadingPercent
  | SetViewStyle
  | LoadFormData
  | LoadFormDataFail
  | LoadFormDataSuccess;
