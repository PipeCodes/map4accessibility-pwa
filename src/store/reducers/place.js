import {
  GET_PLACE_START,
  GET_PLACE_SUCCESS,
  GET_PLACE_ERROR,
  POST_PLACE_START,
  POST_PLACE_SUCCESS,
  POST_PLACE_ERROR,
} from '../actions/types';

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
    case GET_PLACE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case POST_PLACE_START:
      return {
        ...state,
        loading: true,
      };
    case POST_PLACE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_PLACE_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default placeReducer;
