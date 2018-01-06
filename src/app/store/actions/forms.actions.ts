import {Action} from '@ngrx/store';

export const LOAD_FORMS = '[forms] Load Forms';
export const LOAD_FORMS_SUCCESS = '[forms] Load Forms Success';
export const LOAD_FORMS_FAIL = '[forms] Load Forms Fail';
export const SET_ACTIVE_FORM = '[forms] Set Active Form';

export class LoadForms implements Action {
  readonly type = LOAD_FORMS;
}

export class LoadFormsSuccess implements Action {
  readonly type = LOAD_FORMS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadFormsFail implements Action {
  readonly type = LOAD_FORMS_FAIL;
  constructor(public payload: any) {}
}

export class SetActiveForm implements Action {
  readonly type = SET_ACTIVE_FORM;
  constructor(public payload: string) {}
}

export type FormsActions = LoadForms | LoadFormsFail | LoadFormsSuccess | SetActiveForm;
