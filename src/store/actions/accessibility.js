import {
  INCREASE_FONT_SIZE,
  DECREASE_FONT_SIZE,
  RESET_FONT_SIZE,
  SET_FONT,
  SET_UNDERLINE,
  SET_HIGHLIGHT,
  REMOVE_ANIMATIONS,
  SET_LIGHTS_OFF,
  RESET_CONTRAST,
  RESET_SETTINGS,
  SET_BACKGROUND_COLOR,
  TOGGLE_COLORS,
} from './types';

export const increaseFontSize = () => async (dispatch) => {
  dispatch({ type: INCREASE_FONT_SIZE });
};

export const decreaseFontSize = () => async (dispatch) => {
  dispatch({ type: DECREASE_FONT_SIZE });
};

export const resetFontSize = () => async (dispatch) => {
  dispatch({ type: RESET_FONT_SIZE });
};

export const setFont = () => async (dispatch) => {
  dispatch({ type: SET_FONT });
};

export const setBackgroundColor = (color) => async (dispatch) => {
  dispatch({ type: SET_BACKGROUND_COLOR, color });
};

export const toggleColors = () => async (dispatch) => {
  dispatch({ type: TOGGLE_COLORS });
};

export const setUnderline = () => async (dispatch) => {
  dispatch({ type: SET_UNDERLINE });
};

export const setHighlight = () => async (dispatch) => {
  dispatch({ type: SET_HIGHLIGHT });
};

export const removeAnimations = () => async (dispatch) => {
  dispatch({ type: REMOVE_ANIMATIONS });
};

export const setLightsOff = () => async (dispatch) => {
  dispatch({ type: SET_LIGHTS_OFF });
};

export const resetContrast = () => async (dispatch) => {
  dispatch({ type: RESET_CONTRAST });
};

export const resetSettings = () => async (dispatch) => {
  dispatch({ type: RESET_SETTINGS });
};
