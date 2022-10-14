import {
  INCREASE_FONT_SIZE,
  DECREASE_FONT_SIZE,
  RESET_FONT_SIZE,
  SET_FONT,
  SET_BACKGROUND_COLOR,
  SET_UNDERLINE,
  SET_HIGHLIGHT,
  SET_LIGHTS_OFF,
  RESET_CONTRAST,
  REMOVE_ANIMATIONS,
  RESET_SETTINGS,
  TOGGLE_COLORS,
} from '../actions/types';

const initialState = {
  fontSize: 0,
  font: null,
  backgroundColor: null,
  underline: false,
  highlight: false,
  animations: false,
  styles: true,
  lightsOffMode: false,
  toggleColors: false,
};

const accessibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize + 1,
      };
    case DECREASE_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize - 1,
      };
    case RESET_FONT_SIZE:
      return {
        ...state,
        fontSize: 0,
      };
    case SET_FONT:
      return {
        ...state,
        font: state.font ? null : 'Arial, Helvetica, sans-serif !important',
      };

    case SET_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.color,
      };

    case SET_UNDERLINE:
      return {
        ...state,
        underline: !state.underline,
      };

    case SET_HIGHLIGHT:
      return {
        ...state,
        highlight: !state.highlight,
      };

    case TOGGLE_COLORS:
      return {
        ...state,
        toggleColors: !state.toggleColors,
      };

    case REMOVE_ANIMATIONS:
      return {
        ...state,
        animations: !state.highlight,
      };

    case SET_LIGHTS_OFF:
      return {
        ...state,
        lightsOffMode: !state.lightsOffMode,
      };

    case RESET_CONTRAST:
      return {
        ...state,
        backgroundColor: null,
        underline: false,
        highlight: false,
        animations: false,
        styles: true,
        lightsOffMode: false,
        toggleColors: false,
      };

    case RESET_SETTINGS:
      return {
        fontSize: 0,
        font: null,
        backgroundColor: null,
        underline: false,
        highlight: false,
        animations: false,
        styles: true,
        lightsOffMode: false,
        toggleColors: false,
      };

    default:
      return state;
  }
};

export default accessibilityReducer;
