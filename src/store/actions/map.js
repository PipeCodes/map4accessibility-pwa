import { MAP_SET_ZOOM, MAP_SHOWING_PINS } from './types';

export const setMapZoom = (zoom) => async (dispatch) => {
  dispatch({ type: MAP_SET_ZOOM, zoom });
};

export const setShowPins = (flag) => async (dispatch) => {
  dispatch({ type: MAP_SHOWING_PINS, flag });
};
