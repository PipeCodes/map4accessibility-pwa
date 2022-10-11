import {
    GET_LEVELS_START,
    GET_LEVELS_SUCCESS,
    GET_LEVELS_ERROR
  } from '../actions/types';
  
  const initialState = {
    cycle: null,
    quizzes: null,
    loading: false,
  };
  
  const levelsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_LEVELS_START:
        return {
          ...state,
          cycle: null,
          quizzes: [],
          loading: true,
        };
      case GET_LEVELS_SUCCESS:
        return {
          ...state,
          cycle: action.data.cycle,
          quizzes: action.data.quizzes,
          loading: false,
        };
      case GET_LEVELS_ERROR:
        return {
          ...state,
          cycle: null,
          quizzes: null,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default levelsReducer;
  