import {selectFormState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as fromForm from '../forms/form.reducer';
import {createAotCompiler} from '@angular/compiler';

export const selectIds = createSelector(selectFormState, fromForm.selectIds);
export const selectEntities = createSelector(selectFormState, fromForm.selectEntities);
export const selectAll = createSelector(selectFormState, fromForm.selectAll);
export const selectTotal = createSelector(selectFormState, fromForm.selectTotal);
export const selectCurrentId = createSelector(selectFormState, fromForm.getSelectedId);
export const selectLoading = createSelector(selectFormState, fromForm.getLoading);
export const selectLoaded = createSelector(selectFormState, fromForm.getLoaded);

export const selectCurrentForm = createSelector(
  selectEntities,
  selectCurrentId,
  (entities, currentId) => entities[currentId]
);

