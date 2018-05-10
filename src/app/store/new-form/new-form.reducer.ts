import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NewFormActions, NewFormActionTypes } from './new-form.actions';
import {Form} from '../forms/form.model';

export interface State extends EntityState<Form> {
  selectedId: string;
}

export const adapter: EntityAdapter<Form> = createEntityAdapter<Form>();

export const initialState: State = adapter.getInitialState({
   selectedId: null
});

export function reducer(
  state = initialState,
  action: NewFormActions
): State {
  switch (action.type) {
    case NewFormActionTypes.AddNewForm: {
      return adapter.addOne(action.payload.newForm, state);
    }

    case NewFormActionTypes.SetSelectedForm: {
      return { ...state, selectedId: action.payload.id };
    }

    case NewFormActionTypes.UpsertNewForm: {
      return adapter.upsertOne(action.payload.newForm, state);
    }

    case NewFormActionTypes.AddNewForms: {
      return adapter.addMany(action.payload.newForms, state);
    }

    case NewFormActionTypes.UpsertNewForms: {
      return adapter.upsertMany(action.payload.newForms, state);
    }

    case NewFormActionTypes.UpdateNewForm: {
      return adapter.updateOne(action.payload.newForm, state);
    }

    case NewFormActionTypes.UpdateNewForms: {
      return adapter.updateMany(action.payload.newForms, state);
    }

    case NewFormActionTypes.DeleteNewForm: {
      return adapter.removeOne(action.payload.id, state);
    }

    case NewFormActionTypes.DeleteNewForms: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case NewFormActionTypes.LoadNewForms: {
      return adapter.addAll(action.payload.newForms, state);
    }

    case NewFormActionTypes.ClearNewForms: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
