import {
  INCREASE_FONT_SIZE,
  DECREASE_FONT_SIZE,
  RESET_FONT_SIZE,
  SET_FONT,
} from '../actions/types';

const initialState = {
  fontSize: 0,
  font: null,
  color: null,
  underlineLinks: false,
  animations: false,
  styles: true,
  lighsOffMode: false,
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
        font: state.font
          ? null
          : {
              regular: 'arial',
              bold: 'arial',
            },
      };
    default:
      return state;
  }
};

export default accessibilityReducer;
