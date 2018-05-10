import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Form } from './form.model';
import { FormActions, FormActionTypes } from './form.actions';
import {DateElementActionTypes} from '../data-elements/date-element.actions';

export interface State extends EntityState<Form> {
  // additional entities state properties
  selectedId: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Form> = createEntityAdapter<Form>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: FormActions
): State {
  switch (action.type) {
    case FormActionTypes.AddForm: {
      return adapter.addOne(action.payload.form, state);
    }

    case FormActionTypes.UpsertForm: {
      return adapter.upsertOne(action.payload.form, state);
    }

    case FormActionTypes.AddForms: {
      return adapter.addMany(action.payload.forms, state);
    }

    case FormActionTypes.UpsertForms: {
      return adapter.upsertMany(action.payload.forms, state);
    }

    case FormActionTypes.UpdateForm: {
      return adapter.updateOne(action.payload.form, state);
    }

    case FormActionTypes.UpdateForms: {
      return adapter.updateMany(action.payload.forms, state);
    }

    case FormActionTypes.DeleteForm: {
      return adapter.removeOne(action.payload.id, state);
    }

    case FormActionTypes.DeleteForms: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case FormActionTypes.LoadForms: {
      return adapter.addAll(action.payload.forms, state);
    }

    case FormActionTypes.ClearForms: {
      return adapter.removeAll(state);
    }

    case FormActionTypes.GetForms: {
      return {...state, loading: true};
    }

    case FormActionTypes.SetSelectedForm: {
      return {...state, selectedId: action.payload};
    }

    case FormActionTypes.DoneGettingForms: {
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
