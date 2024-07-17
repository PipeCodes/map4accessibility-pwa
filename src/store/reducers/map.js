import { MAP_SET_ZOOM, MAP_SHOWING_PINS } from '../actions/types';

const initialState = {
  coords: null,
  zoom: null,
  isShowingPins: false,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_SET_ZOOM:
      return {
        ...state,
        zoom: action.zoom,
      };
    case MAP_SHOWING_PINS:
      return {
        ...state,
        isShowingPins: action.flag,
      };
    default:
      return state;
  }
};

export default mapReducer;
