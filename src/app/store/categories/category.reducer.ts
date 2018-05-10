import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from './category.model';
import { CategoryActions, CategoryActionTypes } from './category.actions';

export interface State extends EntityState<Category> {
  selectedId: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: CategoryActions
): State {
  switch (action.type) {
    case CategoryActionTypes.AddCategory: {
      return adapter.addOne(action.payload.category, state);
    }

    case CategoryActionTypes.UpsertCategory: {
      return adapter.upsertOne(action.payload.category, state);
    }

    case CategoryActionTypes.AddCategories: {
      return adapter.addMany(action.payload.categorys, state);
    }

    case CategoryActionTypes.UpsertCategories: {
      return adapter.upsertMany(action.payload.categorys, state);
    }

    case CategoryActionTypes.UpdateCategory: {
      return adapter.updateOne(action.payload.category, state);
    }

    case CategoryActionTypes.UpdateCategories: {
      return adapter.updateMany(action.payload.categorys, state);
    }

    case CategoryActionTypes.DeleteCategory: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CategoryActionTypes.DeleteCategories: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CategoryActionTypes.LoadCategories: {
      return adapter.addAll(action.payload.categorys, state);
    }

    case CategoryActionTypes.ClearCategories: {
      return adapter.removeAll(state);
    }

    case CategoryActionTypes.GetCategories: {
      return {...state, loading: true, loaded: false};
    }

    case CategoryActionTypes.DoneGettingCategories: {
      return {...state, loading: false, loaded: true};
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
