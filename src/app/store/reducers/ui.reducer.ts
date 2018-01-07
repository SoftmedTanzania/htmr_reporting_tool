import * as fromuiaction from '../actions/ui.actions';

export interface UiState {
  current_hovered_scorecard: string;
  view_title: string;
  home_loading_percent: number;
  view_style: string;
  form_data: any;
  data_loading: boolean;
  data_loaded: boolean;
}

export const initialUiState: UiState = {
  current_hovered_scorecard: '',
  view_title: 'List View',
  home_loading_percent: 0,
  view_style: 'Card',
  form_data: null,
  data_loaded : false,
  data_loading: false
};


export function uiReducer(
  state = initialUiState,
  action: fromuiaction.UiActions
): UiState {

  switch (action.type) {
    case (fromuiaction.SET_VIEW_TITLE): {
      return {
        ...state,
        view_title: action.payload
      };
    }

    case (fromuiaction.SET_HOME_LOADING_PERCENT): {
      return {
        ...state,
        home_loading_percent: action.payload
      };
    }

    case (fromuiaction.SET_VIEW_STYLE): {
      return {
        ...state,
        view_style: action.payload
      };
    }

    case(fromuiaction.LOAD_FORM_DATA): {
      return {...state, data_loading: true };
    }

    case(fromuiaction.LOAD_FORM_DATA_SUCCESS): {
      const form_data = {
        dataSet: action.payload.dataSet,
        period: action.payload.period,
        orgUnit: action.payload.orgUnit,
        dataValues: action.payload.dataValues ? action.payload.dataValues : []
      };
      return {...state, data_loaded: true, data_loading: false, form_data };
    }

    case(fromuiaction.LOAD_FORM_DATA_FAIL): {
      return {...state, data_loaded: false, data_loading: false };
    }
  }

  return state;
}

export const getViewTitle = (state: UiState) => state.view_title;
export const getViewStyle = (state: UiState) => state.view_style;
export const getHomeLoadingPercent = (state: UiState) => state.home_loading_percent;
export const getFormData = (state: UiState) => state.form_data;
export const getDataLoading = (state: UiState) => state.data_loading;
export const getDataLoaded = (state: UiState) => state.data_loaded;
