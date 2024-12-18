import {
  GET_PLACE_EVALUATIONS_START,
  GET_PLACE_EVALUATIONS_SUCCESS,
  GET_PLACE_EVALUATIONS_SUMS,
  POST_PLACE_EVALUATIONS_START,
  POST_PLACE_EVALUATIONS_SUCCESS,
  POST_PLACE_EVALUATIONS_ERROR,
} from '../actions/types';

const initialState = {
  evaluations: null,
  sums: {},
  loading: false,
};

const placeEvaluationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACE_EVALUATIONS_START:
      return {
        ...state,
        evaluations: null,
        loading: true,
      };
    case GET_PLACE_EVALUATIONS_SUCCESS:
      return {
        ...state,
        evaluations: action.evaluations,
        loading: false,
      };
    case GET_PLACE_EVALUATIONS_SUMS:
      return {
        ...state,
        sums: action.sums,
        loading: false,
      };
    case POST_PLACE_EVALUATIONS_START:
      return {
        ...state,
        loading: true,
      };
    case POST_PLACE_EVALUATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_PLACE_EVALUATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default placeEvaluationsReducer;
