import {
  GET_QUIZ_START,
  GET_QUIZ_SUCCESS,
  GET_QUIZ_ERROR,
  REGISTER_LAST_ANSWER_SUCCESS,
  RESET_QUIZ_STATE,
} from '../actions/types';

const initialState = {
  quiz: null,
  quizResults: null,
  loading: false,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUIZ_START:
      return {
        ...state,
        quiz: null,
        loading: true,
      };
    case GET_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false,
        quizResults: action.results,
      };
    case GET_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REGISTER_LAST_ANSWER_SUCCESS:
      return {
        ...state,
        quizResults: action.results,
      };
    case RESET_QUIZ_STATE:
      return initialState;
    default:
      return state;
  }
};

export default quizReducer;
