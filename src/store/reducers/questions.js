import {
  GET_QUESTIONS_START,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from '../actions/types';

const initialState = {
  questions: null,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_START:
      return {
        ...state,
        questions: [],
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.data,
      };
    case GET_QUESTIONS_ERROR:
      return {
        ...state,
        questions: null,
      };
    default:
      return state;
  }
};

export default questionsReducer;
