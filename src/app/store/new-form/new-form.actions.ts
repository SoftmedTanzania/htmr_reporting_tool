import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {Form} from '../forms/form.model';

export enum NewFormActionTypes {
  LoadNewForms = '[NewForm] Load NewForms',
  SetSelectedForm = '[NewForm] Set Selected Form',
  AddNewForm = '[NewForm] Add NewForm',
  UpsertNewForm = '[NewForm] Upsert NewForm',
  AddNewForms = '[NewForm] Add NewForms',
  UpsertNewForms = '[NewForm] Upsert NewForms',
  UpdateNewForm = '[NewForm] Update NewForm',
  UpdateNewForms = '[NewForm] Update NewForms',
  DeleteNewForm = '[NewForm] Delete NewForm',
  DeleteNewForms = '[NewForm] Delete NewForms',
  ClearNewForms = '[NewForm] Clear NewForms'
}

export class LoadNewForms implements Action {
  readonly type = NewFormActionTypes.LoadNewForms;

  constructor(public payload: { newForms: Form[] }) {}
}

export class SetSelectedForm implements Action {
  readonly type = NewFormActionTypes.SetSelectedForm;

  constructor(public payload: { id: string }) {}
}

export class AddNewForm implements Action {
  readonly type = NewFormActionTypes.AddNewForm;

  constructor(public payload: { newForm: Form }) {}
}

export class UpsertNewForm implements Action {
  readonly type = NewFormActionTypes.UpsertNewForm;

  constructor(public payload: { newForm: Update<Form> }) {}
}

export class AddNewForms implements Action {
  readonly type = NewFormActionTypes.AddNewForms;

  constructor(public payload: { newForms: Form[] }) {}
}

export class UpsertNewForms implements Action {
  readonly type = NewFormActionTypes.UpsertNewForms;

  constructor(public payload: { newForms: Update<Form>[] }) {}
}

export class UpdateNewForm implements Action {
  readonly type = NewFormActionTypes.UpdateNewForm;

  constructor(public payload: { newForm: Update<Form> }) {}
}

export class UpdateNewForms implements Action {
  readonly type = NewFormActionTypes.UpdateNewForms;

  constructor(public payload: { newForms: Update<Form>[] }) {}
}

export class DeleteNewForm implements Action {
  readonly type = NewFormActionTypes.DeleteNewForm;

  constructor(public payload: { id: string }) {}
}

export class DeleteNewForms implements Action {
  readonly type = NewFormActionTypes.DeleteNewForms;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearNewForms implements Action {
  readonly type = NewFormActionTypes.ClearNewForms;
}

export type NewFormActions =
 LoadNewForms
 | AddNewForm
 | UpsertNewForm
 | AddNewForms
 | UpsertNewForms
 | UpdateNewForm
 | UpdateNewForms
 | DeleteNewForm
 | DeleteNewForms
 | ClearNewForms
  | SetSelectedForm;
