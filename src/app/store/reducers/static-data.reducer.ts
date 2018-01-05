import { UserGroup } from '../../shared/models/user-group';
import * as dataActions from '../actions/static-data.actions';

export interface StaticDataState {
  userGroups: UserGroup[];
  user: any;
  functions_loaded: boolean;
  userGroups_loaded: boolean;
  user_loaded: boolean;
}

export const initialStaticDataState = {
  userGroups: [],
  user: null,
  functions_loaded: false,
  userGroups_loaded: false,
  user_loaded: false,
}

export function staticDataReducer (
  state = initialStaticDataState,
  action: dataActions.StaticDataActions
): StaticDataState {

  switch (action.type) {
    case(dataActions.LOAD_USER_GROUPS_DONE): {
      return {...state, userGroups: action.payload, userGroups_loaded: true };
    }

    case(dataActions.LOAD_USER_DONE): {
      return {...state, user: action.payload, user_loaded: true };
    }

  }
  return state;
}


export const getUserGroups = (state: StaticDataState) => state.userGroups;
export const getUserGroupsLoaded = (state: StaticDataState) => state.userGroups_loaded;
export const getUser = (state: StaticDataState) => state.user;
export const getUserLoaded = (state: StaticDataState) => state.user_loaded;
