import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Category } from './category.model';

export enum CategoryActionTypes {
  GetCategories = '[Category] Get Categories',
  DoneGettingCategories = '[Category] Done Getting Categories',
  LoadCategories = '[Category] Load Categories',
  AddCategory = '[Category] Add Category',
  UpsertCategory = '[Category] Upsert Category',
  AddCategories = '[Category] Add Categories',
  UpsertCategories = '[Category] Upsert Categories',
  UpdateCategory = '[Category] Update Category',
  UpdateCategories = '[Category] Update Categories',
  DeleteCategory = '[Category] Delete Category',
  DeleteCategories = '[Category] Delete Categories',
  ClearCategories = '[Category] Clear Categories'
}

export class LoadCategories implements Action {
  readonly type = CategoryActionTypes.LoadCategories;

  constructor(public payload: { categorys: Category[] }) {}
}

export class AddCategory implements Action {
  readonly type = CategoryActionTypes.AddCategory;

  constructor(public payload: { category: Category }) {}
}

export class UpsertCategory implements Action {
  readonly type = CategoryActionTypes.UpsertCategory;

  constructor(public payload: { category: Update<Category> }) {}
}

export class AddCategories implements Action {
  readonly type = CategoryActionTypes.AddCategories;

  constructor(public payload: { categorys: Category[] }) {}
}

export class UpsertCategories implements Action {
  readonly type = CategoryActionTypes.UpsertCategories;

  constructor(public payload: { categorys: Update<Category>[] }) {}
}

export class UpdateCategory implements Action {
  readonly type = CategoryActionTypes.UpdateCategory;

  constructor(public payload: { category: Update<Category> }) {}
}

export class UpdateCategories implements Action {
  readonly type = CategoryActionTypes.UpdateCategories;

  constructor(public payload: { categorys: Update<Category>[] }) {}
}

export class DeleteCategory implements Action {
  readonly type = CategoryActionTypes.DeleteCategory;

  constructor(public payload: { id: string }) {}
}

export class DeleteCategories implements Action {
  readonly type = CategoryActionTypes.DeleteCategories;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCategories implements Action {
  readonly type = CategoryActionTypes.ClearCategories;
}

export class GetCategories implements Action {
  readonly type = CategoryActionTypes.GetCategories;
}

export class DoneGettingCategories implements Action {
  readonly type = CategoryActionTypes.DoneGettingCategories;
}

export type CategoryActions =
 LoadCategories
 | AddCategory
 | UpsertCategory
 | AddCategories
 | UpsertCategories
 | UpdateCategory
 | UpdateCategories
 | DeleteCategory
 | DeleteCategories
 | ClearCategories
  | DoneGettingCategories
  | GetCategories;
