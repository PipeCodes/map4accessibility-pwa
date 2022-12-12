import { SET_DIRECTIONS, SET_ROUTE } from '../actions/types';

const initialState = {
  directions: null,
  routes: null,
  selectedRoute: 0,
};

const directionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTIONS:
      return {
        ...state,
        directions: action.results,
        routes: action.routes,
        selectedRoute: 0,
      };
    case SET_ROUTE:
      return {
        ...state,
        selectedRoute: action.id,
      };
    default:
      return state;
  }
};

export default directionsReducer;
