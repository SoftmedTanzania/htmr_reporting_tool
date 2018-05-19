import { createSelector } from '@ngrx/store';
import * as formSelectors from '../reducers/forms.reducer';
import {getFormState} from '../reducers';
export const getStoreResources = createSelector(getFormState, formSelectors.getStoreResources);
export const getForms = createSelector(getFormState, formSelectors.getForms);
export const getFormsLoaded = createSelector(getFormState, formSelectors.getFormsLoaded);
export const getFormsLoading = createSelector(getFormState, formSelectors.getFormsLoading);
export const getSelectedFormID = createSelector(getFormState, formSelectors.getSelectedForm);
export const getCategories = createSelector(getFormState, formSelectors.getCategories);
export const getDataelements = createSelector(getFormState, formSelectors.getDataelements);
export const getOrgunit = createSelector(getFormState, formSelectors.getOrgunit);
export const getPeriod = createSelector(getFormState, formSelectors.getPeriod);
export const getFormReady = createSelector(getFormState, formSelectors.getFormReady);
import * as fromForm from '../forms/form.selector';
import {Form} from '../forms/form.model';

// export const getSelectedForm = createSelector(getForms, getSelectedFormID, (forms, selectedFormId) => forms[selectedFormId]);
export const getSelectedForm = createSelector(getFormState, (formstate) => {
  const form = formstate.forms[formstate.current_form];
  if (form) {
    for ( const section of form.sections) {
      section.categoryItems = section.categories.map((cat) => {
        return formstate.categories[cat];
      });
    }
  }

  return form;
});
export const getPeriodType = createSelector(fromForm.selectCurrentForm, (form: any) => form ? form.periodType : 'Monthly');

export const getFormsList = createSelector(getForms, (forms) => {
  return Object.keys(forms).map((key) => forms[key]);
});
export const getCategoriesList = createSelector(getCategories, (categories) => Object.keys(categories).map((key) => categories[key]));
export const getDataelementsList = createSelector(getDataelements,
  (dataElements) => { return Object.keys(dataElements).map((key) => dataElements[key]);
});
