import { GET_PLACE_START, GET_PLACE_SUCCESS } from '../actions/types';

const initialState = {
  place: null,
  loading: false,
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACE_START:
      return {
        ...state,
        place: null,
        loading: true,
      };
    case GET_PLACE_SUCCESS:
      return {
        ...state,
        place: action.place,
        loading: false,
      };

    default:
      return state;
  }
};

export default placeReducer;
