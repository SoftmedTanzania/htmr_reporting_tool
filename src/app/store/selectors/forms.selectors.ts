import { createSelector } from '@ngrx/store';
import * as formSelectors from '../reducers/forms.reducer';
import {getFormState} from '../reducers';

export const getForms = createSelector(getFormState, formSelectors.getForms);
export const getFormsLoaded = createSelector(getFormState, formSelectors.getFormsLoaded);
export const getFormsLoading = createSelector(getFormState, formSelectors.getFormsLoading);
export const getSelectedForm = createSelector(getFormState, formSelectors.getSelectedForm);
export const getCategories = createSelector(getFormState, formSelectors.getCategories);
export const getDataelements = createSelector(getFormState, formSelectors.getDataelements);


export const getFormsList = createSelector(getForms, (forms) => {
  return Object.keys(forms).map((key) => forms[key]);
});
export const getCategoriesList = createSelector(getCategories, (categories) => Object.keys(categories).map((key) => categories[key]));
export const getDataelementsList = createSelector(getDataelements,
  (dataElements) => { return Object.keys(dataElements).map((key) => dataElements[key]);
});
