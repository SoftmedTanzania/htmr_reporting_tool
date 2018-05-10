import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Form } from './form.model';
import {DateElementActionTypes} from '../data-elements/date-element.actions';

export enum FormActionTypes {
  GetForms= '[Form] Get Forms',
  DoneGettingForms = '[Form] Done Getting Forms',
  SetSelectedForm = '[Form] Set Selected Form',
  LoadForms = '[Form] Load Forms',
  AddForm = '[Form] Add Form',
  UpsertForm = '[Form] Upsert Form',
  AddForms = '[Form] Add Forms',
  UpsertForms = '[Form] Upsert Forms',
  UpdateForm = '[Form] Update Form',
  UpdateForms = '[Form] Update Forms',
  DeleteForm = '[Form] Delete Form',
  DeleteForms = '[Form] Delete Forms',
  ClearForms = '[Form] Clear Forms'
}

export class LoadForms implements Action {
  readonly type = FormActionTypes.LoadForms;

  constructor(public payload: { forms: Form[] }) {}
}

export class AddForm implements Action {
  readonly type = FormActionTypes.AddForm;

  constructor(public payload: { form: Form }) {}
}

export class UpsertForm implements Action {
  readonly type = FormActionTypes.UpsertForm;

  constructor(public payload: { form: Update<Form> }) {}
}

export class AddForms implements Action {
  readonly type = FormActionTypes.AddForms;

  constructor(public payload: { forms: Form[] }) {}
}

export class UpsertForms implements Action {
  readonly type = FormActionTypes.UpsertForms;

  constructor(public payload: { forms: Update<Form>[] }) {}
}

export class UpdateForm implements Action {
  readonly type = FormActionTypes.UpdateForm;

  constructor(public payload: { form: Update<Form> }) {}
}

export class UpdateForms implements Action {
  readonly type = FormActionTypes.UpdateForms;

  constructor(public payload: { forms: Update<Form>[] }) {}
}

export class DeleteForm implements Action {
  readonly type = FormActionTypes.DeleteForm;

  constructor(public payload: { id: string }) {}
}

export class DeleteForms implements Action {
  readonly type = FormActionTypes.DeleteForms;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearForms implements Action {
  readonly type = FormActionTypes.ClearForms;
}

export class GetForms implements Action {
  readonly type = FormActionTypes.GetForms;
}

export class DoneGettingForms implements Action {
  readonly type = FormActionTypes.DoneGettingForms;
}

export class SetSelectedForm implements Action {
  readonly type = FormActionTypes.SetSelectedForm;
  constructor(public payload: string) {}
}


export type FormActions =
 LoadForms
 | AddForm
 | UpsertForm
 | AddForms
 | UpsertForms
 | UpdateForm
 | UpdateForms
 | DeleteForm
 | DeleteForms
 | ClearForms
 | GetForms
 | DoneGettingForms
 | SetSelectedForm;
