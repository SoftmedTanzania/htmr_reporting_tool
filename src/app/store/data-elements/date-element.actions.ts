import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { DateElement } from './date-element.model';

export enum DateElementActionTypes {
  GetDateElements = '[DateElement] Get DateElements',
  DoneGettingDateElements = '[DateElement] Done Getting DateElements',
  LoadDateElements = '[DateElement] Load DateElements',
  AddDateElement = '[DateElement] Add DateElement',
  UpsertDateElement = '[DateElement] Upsert DateElement',
  AddDateElements = '[DateElement] Add DateElements',
  UpsertDateElements = '[DateElement] Upsert DateElements',
  UpdateDateElement = '[DateElement] Update DateElement',
  UpdateDateElements = '[DateElement] Update DateElements',
  DeleteDateElement = '[DateElement] Delete DateElement',
  DeleteDateElements = '[DateElement] Delete DateElements',
  ClearDateElements = '[DateElement] Clear DateElements'
}

export class LoadDateElements implements Action {
  readonly type = DateElementActionTypes.LoadDateElements;

  constructor(public payload: { dateElements: DateElement[] }) {}
}

export class AddDateElement implements Action {
  readonly type = DateElementActionTypes.AddDateElement;

  constructor(public payload: { dateElement: DateElement }) {}
}

export class UpsertDateElement implements Action {
  readonly type = DateElementActionTypes.UpsertDateElement;

  constructor(public payload: { dateElement: Update<DateElement> }) {}
}

export class AddDateElements implements Action {
  readonly type = DateElementActionTypes.AddDateElements;

  constructor(public payload: { dateElements: DateElement[] }) {}
}

export class UpsertDateElements implements Action {
  readonly type = DateElementActionTypes.UpsertDateElements;

  constructor(public payload: { dateElements: Update<DateElement>[] }) {}
}

export class UpdateDateElement implements Action {
  readonly type = DateElementActionTypes.UpdateDateElement;

  constructor(public payload: { dateElement: Update<DateElement> }) {}
}

export class UpdateDateElements implements Action {
  readonly type = DateElementActionTypes.UpdateDateElements;

  constructor(public payload: { dateElements: Update<DateElement>[] }) {}
}

export class DeleteDateElement implements Action {
  readonly type = DateElementActionTypes.DeleteDateElement;

  constructor(public payload: { id: string }) {}
}

export class DeleteDateElements implements Action {
  readonly type = DateElementActionTypes.DeleteDateElements;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearDateElements implements Action {
  readonly type = DateElementActionTypes.ClearDateElements;
}

export class GetDateElements implements Action {
  readonly type = DateElementActionTypes.GetDateElements;
}

export class DoneGettingDateElements implements Action {
  readonly type = DateElementActionTypes.DoneGettingDateElements;
}



export type DateElementActions =
 LoadDateElements
 | AddDateElement
 | UpsertDateElement
 | AddDateElements
 | UpsertDateElements
 | UpdateDateElement
 | UpdateDateElements
 | DeleteDateElement
 | DeleteDateElements
 | ClearDateElements
  | GetDateElements
  | DoneGettingDateElements;
