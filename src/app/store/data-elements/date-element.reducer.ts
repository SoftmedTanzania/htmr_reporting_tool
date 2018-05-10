import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DateElement } from './date-element.model';
import { DateElementActions, DateElementActionTypes } from './date-element.actions';
import {CategoryActionTypes} from '../categories/category.actions';

export interface State extends EntityState<DateElement> {
  selectedId: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<DateElement> = createEntityAdapter<DateElement>();

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: DateElementActions
): State {
  switch (action.type) {
    case DateElementActionTypes.AddDateElement: {
      return adapter.addOne(action.payload.dateElement, state);
    }

    case DateElementActionTypes.UpsertDateElement: {
      return adapter.upsertOne(action.payload.dateElement, state);
    }

    case DateElementActionTypes.AddDateElements: {
      return adapter.addMany(action.payload.dateElements, state);
    }

    case DateElementActionTypes.UpsertDateElements: {
      return adapter.upsertMany(action.payload.dateElements, state);
    }

    case DateElementActionTypes.UpdateDateElement: {
      return adapter.updateOne(action.payload.dateElement, state);
    }

    case DateElementActionTypes.UpdateDateElements: {
      return adapter.updateMany(action.payload.dateElements, state);
    }

    case DateElementActionTypes.DeleteDateElement: {
      return adapter.removeOne(action.payload.id, state);
    }

    case DateElementActionTypes.DeleteDateElements: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case DateElementActionTypes.LoadDateElements: {
      return adapter.addAll(action.payload.dateElements, state);
    }

    case DateElementActionTypes.ClearDateElements: {
      return adapter.removeAll(state);
    }

    case DateElementActionTypes.GetDateElements: {
      return {...state, loading: true, loaded: false};
    }

    case DateElementActionTypes.DoneGettingDateElements: {
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
