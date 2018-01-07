import { createSelector } from '@ngrx/store';
import {getFormState, getUiState} from '../reducers';
import * as fromUiState from '../reducers/ui.reducer';

export const getViewTitle = createSelector(getUiState, fromUiState.getViewTitle);

export const getViewStyle = createSelector(getUiState, fromUiState.getViewStyle);

export const getHomeLoadingPercent = createSelector(getUiState, fromUiState.getHomeLoadingPercent);

export const getFormData = createSelector(getUiState, fromUiState.getFormData);
export const getDataLoading = createSelector(getUiState, fromUiState.getDataLoading);
export const getDataLoaded = createSelector(getUiState, fromUiState.getDataLoaded);
export const getSavedData = createSelector(getUiState, fromUiState.getSavedData);

export const getDataObect = createSelector(getFormData, (form_data) => {
  const dataObject = {};
  if(form_data.hasOwnProperty('dataValues')) {
    for ( const item of form_data.dataValues) {
      dataObject[item.dataElement + '_' + item.period + '_' + item.orgUnit] = item.value;
    }
  }
  return dataObject;
});
