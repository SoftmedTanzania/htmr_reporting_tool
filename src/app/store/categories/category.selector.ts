import {selectCategoryState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as fromCategory from '../categories/category.reducer';

export const selectIds = createSelector(selectCategoryState, fromCategory.selectIds);
export const selectEntities = createSelector(selectCategoryState, fromCategory.selectEntities);
export const selectAll = createSelector(selectCategoryState, fromCategory.selectAll);
export const selectTotal = createSelector(selectCategoryState, fromCategory.selectTotal);
export const selectCurrentId = createSelector(selectCategoryState, fromCategory.getSelectedId);
export const selectLoading = createSelector(selectCategoryState, fromCategory.getLoading);
export const selectLoaded = createSelector(selectCategoryState, fromCategory.getLoaded);
