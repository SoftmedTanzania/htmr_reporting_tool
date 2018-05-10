import {createSelector} from '@ngrx/store';

import {getRouterState, selectNewFormState} from '../reducers';
import * as fromNewForm from '../new-form/new-form.reducer';
import * as fromForm from '../forms/form.selector';
import {Form} from '../forms/form.model';

export const selectIds = createSelector(selectNewFormState, fromNewForm.selectIds);
export const selectEntities = createSelector(selectNewFormState, fromNewForm.selectEntities);
export const selectAll = createSelector(selectNewFormState, fromNewForm.selectAll);
export const selectTotal = createSelector(selectNewFormState, fromNewForm.selectTotal);
export const selectCurrentId = createSelector(selectNewFormState, fromNewForm.getSelectedId);

export const getCurrentCreatedForm = createSelector(
  fromForm.selectEntities,
  getRouterState,
  (entities, router): Form => {
    return router.state && entities[router.state.params.formId];
  }
);
