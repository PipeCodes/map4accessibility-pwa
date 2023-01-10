import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  GET_USER_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  user: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        user: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case CREATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
