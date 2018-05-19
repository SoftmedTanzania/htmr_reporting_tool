import {createSelector} from '@ngrx/store';

import {getRouterState, selectNewFormState} from '../reducers';
import * as fromNewForm from '../new-form/new-form.reducer';
import * as fromForm from '../forms/form.selector';
import * as fromCategory from '../categories/category.selector';

export const selectIds = createSelector(selectNewFormState, fromNewForm.selectIds);
export const selectEntities = createSelector(selectNewFormState, fromNewForm.selectEntities);
export const selectAll = createSelector(selectNewFormState, fromNewForm.selectAll);
export const selectTotal = createSelector(selectNewFormState, fromNewForm.selectTotal);
export const selectCurrentId = createSelector(selectNewFormState, fromNewForm.getSelectedId);

export const getCurrentCreatedForm = createSelector(
  selectEntities,
  getRouterState,
  fromCategory.selectEntities,
  (entities, router, categories) => {
    const form  = router.state && entities[router.state.params.formId];
    if (form) {
      for ( const section of form.sections) {
        section.categoryItems = section.categories.map((cat) => {
          return categories[cat];
        });
      }
    }
    return form;
  }
);
