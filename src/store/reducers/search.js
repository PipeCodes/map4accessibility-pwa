import {
  SEARCH_SET_TEXT,
  SEARCH_SET_TYPE,
  SEARCH_CLEAN,
} from '../actions/types';

const initialState = {
  text: null,
  place_type: null,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SET_TEXT:
      return {
        ...state,
        text: action.value,
      };
    case SEARCH_SET_TYPE:
      return {
        ...state,
        placeType: action.value,
      };
    case SEARCH_CLEAN:
      return {
        ...state,
        text: null,
        placeType: null,
      };
    default:
      return state;
  }
};

export default questionsReducer;
