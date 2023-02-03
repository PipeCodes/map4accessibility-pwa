import {
  GET_PLACE_START,
  GET_PLACE_SUCCESS,
  GET_MORE_PLACE_INFO,
  GET_PLACE_ERROR,
  POST_PLACE_START,
  POST_PLACE_SUCCESS,
  POST_PLACE_ERROR,
  RESET_PLACE_STATE,
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
    case GET_MORE_PLACE_INFO:
      return {
        ...state,

        place: {
          ...state.place,
          id: action.id,
          media_evaluations: state.place.media_evaluations.concat(
            action.images,
          ),
          place_evaluations: action.evaluations,
          thumbs_down_count: action.thumbs_down_count,
          thumbs_up_count: action.thumbs_up_count,
        },
        loading: false,
      };
    case RESET_PLACE_STATE:
      return initialState;

    default:
      return state;
  }
};

export default placeReducer;
