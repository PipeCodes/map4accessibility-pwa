import { SEARCH_SET_TEXT, SEARCH_SET_TYPE } from './types';

export const setText = (value) => async (dispatch) => {
  dispatch({ type: SEARCH_SET_TEXT, value });
};

export const setType = (value) => async (dispatch) => {
  dispatch({ type: SEARCH_SET_TYPE, value });
};
