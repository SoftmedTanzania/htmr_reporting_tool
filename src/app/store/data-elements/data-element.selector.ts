import {selectDataElementState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as fromDataElement from '../data-elements/date-element.reducer';

export const selectIds = createSelector(selectDataElementState, fromDataElement.selectIds);
export const selectEntities = createSelector(selectDataElementState, fromDataElement.selectEntities);
export const selectAll = createSelector(selectDataElementState, fromDataElement.selectAll);
export const selectTotal = createSelector(selectDataElementState, fromDataElement.selectTotal);
export const selectCurrentId = createSelector(selectDataElementState, fromDataElement.getSelectedId);
export const selectLoading = createSelector(selectDataElementState, fromDataElement.getLoading);
export const selectLoaded = createSelector(selectDataElementState, fromDataElement.getLoaded);
