import {
  INCREASE_FONT_SIZE,
  DECREASE_FONT_SIZE,
  RESET_FONT_SIZE,
} from './types';

export const increaseFontSize = () => async (dispatch, getState) => {
  // const fontSize = getState().accebilityReducer.fontSize;

  dispatch({ type: INCREASE_FONT_SIZE });
};

export const decreaseFontSize = () => async (dispatch) => {
  dispatch({ type: DECREASE_FONT_SIZE });
};

export const resetFontSize = () => async (dispatch) => {
  dispatch({ type: RESET_FONT_SIZE });
};
