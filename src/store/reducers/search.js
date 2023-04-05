import {
  SEARCH_SET_TEXT,
  SEARCH_SET_TYPE,
  SEARCH_CLEAN,
  SEARCH_SET_DISABILITY,
} from '../actions/types';

const initialState = {
  text: null,
  placeType: null,
  disabilityType: null,
};

const searchReducer = (state = initialState, action) => {
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
    case SEARCH_SET_DISABILITY:
      return {
        ...state,
        disabilityType: action.value,
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

export default searchReducer;
