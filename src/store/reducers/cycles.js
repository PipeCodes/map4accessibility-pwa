import {
  GET_CYCLES_START,
  GET_CYCLES_SUCCESS,
  GET_CYCLES_ERROR
} from '../actions/types';

const initialState = {
  items: null,
  loading: false,
};

const cyclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CYCLES_START:
      return {
        ...state,
        items: [],
        loading: true,
      };
    case GET_CYCLES_SUCCESS:
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    case GET_CYCLES_ERROR:
      return {
        ...state,
        items: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default cyclesReducer;
