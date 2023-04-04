import {
  SEARCH_SET_TEXT,
  SEARCH_SET_TYPE,
  SEARCH_SET_DISABILITY,
} from './types';

export const setText = (value) => async (dispatch) => {
  dispatch({ type: SEARCH_SET_TEXT, value });
};

export const setType = (value) => async (dispatch) => {
  dispatch({ type: SEARCH_SET_TYPE, value });
};

export const setDisability = (value) => async (dispatch) => {
  dispatch({ type: SEARCH_SET_DISABILITY, value });
};
