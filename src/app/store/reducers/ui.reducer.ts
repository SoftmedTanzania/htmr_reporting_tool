import * as fromuiaction from '../actions/ui.actions';
import * as _ from 'lodash';

export interface UiState {
  current_hovered_scorecard: string;
  view_title: string;
  home_loading_percent: number;
  view_style: string;
  form_data: any;
  data_loading: boolean;
  data_loaded: boolean;
  saved_data: any;
}

export const initialUiState: UiState = {
  current_hovered_scorecard: '',
  view_title: 'List View',
  home_loading_percent: 0,
  view_style: 'Card',
  form_data: {},
  data_loaded : false,
  data_loading: false,
  saved_data: {}
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

    case(fromuiaction.SAVE_FORM_DATA): {
      const key = action.payload.dataValues[0].dataElement + '_' + action.payload.dataValues[0].period + '_' + action.payload.dataValues[0].orgUnit;
      const saved_data = {
        ...state.saved_data,
        [key]: {success: false, fail: false, loading: true}
      };
      return {...state, saved_data };
    }

    case(fromuiaction.SAVE_FORM_DATA_FAIL): {
      const key = action.payload.dataValues[0].dataElement + '_' + action.payload.dataValues[0].period + '_' + action.payload.dataValues[0].orgUnit;
      const saved_data = {
        ...state.saved_data,
        [key]: {success: false, fail: true, loading: false}
      };
      return {...state, saved_data };
    }

    case(fromuiaction.SAVE_FORM_DATA_SUCCESS): {
      const key = action.payload.dataValues[0].dataElement + '_' + action.payload.dataValues[0].period + '_' + action.payload.dataValues[0].orgUnit;
      const saved_data = {
        ...state.saved_data,
        [key]: {success: true, fail: false, loading: false}
      };
      const old_values = [...state.form_data.dataValues];
      let dataValues = [];
      const position = _.findIndex(state.form_data.dataValues, {
        'dataElement': action.payload.dataValues[0].dataElement,
        'period': action.payload.dataValues[0].period,
        'orgUnit': action.payload.dataValues[0].orgUnit});
      if ( position === -1 ) {
        if ( action.payload.dataValues[0].value !== 0) {
          dataValues = [...old_values,  ...action.payload.dataValues];
        }
      }else {
        if ( action.payload.dataValues[0].value !== 0) {
          old_values[position] = action.payload.dataValues[0];
        }else {
          old_values.splice(position, 1);
        }

        dataValues = old_values;
      }
      const form_data = {
        ...state.form_data,
        dataValues
      };
      return {
        ...state,
        saved_data,
        form_data
      };
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
export const getSavedData = (state: UiState) => state.saved_data;
