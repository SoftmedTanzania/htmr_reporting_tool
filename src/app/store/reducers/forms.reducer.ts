import * as formAction from '../actions/forms.actions';
import * as orgunitActions from '../actions/orgunits.actions';
import * as dataActions from '../actions/static-data.actions';
export interface FormCategory {
  id: string;
  name: string;
  items: { id: string, name: string}[];
}

export interface DataElement {
  id: string;
  name: string;
  categories: string[];
  categoriesItems: string[];
}


export interface FormSection {
  id: string;
  name: string;
  categories: string[];
  categoryItems?: FormCategory[];
  items: {
    id: string,
    name: string,
    dataElements: string[]
  }[];
}

export interface Forms {
  id: string;
  name: string;
  datasetId: string;
  periodType: string;
  sections: FormSection[];
}

export interface FormsState {
  forms: {[id: string]: Forms };
  categories:  {[id: string]: FormCategory };
  dataElelments:  {[id: string]: DataElement };
  loading: boolean;
  loaded: boolean;
  current_form: string;
  period: any;
  orgunit: any;
  form_ready: boolean;
}

export const InitialFormState: FormsState  = {
  forms: {},
  categories: {},
  dataElelments: {},
  loaded: false,
  loading: false,
  current_form: null,
  form_ready: false,
  period: {
    items: [],
    type: 'Quarterly',
    starting_year: '2017',
    name: 'pe',
    value: '',
  },
  orgunit: {
    starting_name: '',
    items: [],
    name: 'ou',
    value: ''
  }
};

export function formReducer(
  state = InitialFormState,
  action: formAction.FormsActions
): FormsState {
  switch (action.type) {
    case(formAction.LOAD_FORMS): {
      return {
        ...state,
        loading: true
      };
    }

    case(formAction.LOAD_FORMS_SUCCESS): {
      const forms = getEntities(action.payload.forms, state.forms);
      const categories = getEntities(action.payload.categories, state.categories);
      const dataElelments = getEntities(action.payload.dataElelments, state.dataElelments);
      return {
        ...state,
        loading: false,
        loaded: true,
        forms,
        categories,
        dataElelments
      };
    }

    case(formAction.LOAD_FORMS_FAIL): {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case(formAction.SET_ACTIVE_FORM): {
      return {...state, current_form: action.payload };
    }

    case(formAction.SET_ORGUNIT): {
      return {...state, orgunit: action.payload };
    }

    case(formAction.SET_PERIOD): {
      return {...state, period: action.payload };
    }

    case(formAction.RESET_STATE): {
      return {
        ...state,
        form_ready: false,
        period: {
          items: [],
          type: 'Quarterly',
          starting_year: '2017',
          name: 'pe',
          value: '',
        },
        orgunit: {
          starting_name: '',
            items: [],
            name: 'ou',
            value: ''
        }
      };
    }

    case(formAction.SET_FORM_READY): {
      return {...state, form_ready: action.payload };
    }

  }
  return state;
}

export function getEntities(itemArray, initialValues) {
  const entities = itemArray.reduce(
    (entities: { [id: string]: any }, item: any) => {
      return {
        ...entities,
        [item.id]: item,
      };
    },
    {
      ...initialValues,
    }
  );
  return entities;
}

export const getForms = (state: FormsState) => state.forms;
export const getFormsLoaded = (state: FormsState) => state.loaded;
export const getFormsLoading = (state: FormsState) => state.loading;
export const getSelectedForm = (state: FormsState) => state.current_form;
export const getCategories = (state: FormsState) => state.categories;
export const getDataelements = (state: FormsState) => state.dataElelments;
export const getOrgunit = (state: FormsState) => state.orgunit;
export const getPeriod = (state: FormsState) => state.period;
export const getFormReady = (state: FormsState) => state.form_ready;


