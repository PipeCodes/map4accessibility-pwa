import {
  GET_RANKING_START,
  GET_RANKING_SUCCESS,
  GET_RANKING_ERROR,
} from '../actions/types';

const initialState = {
  generalRanking: null,
  userRanking: null,
  loading: false,
};

const rankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RANKING_START:
      return {
        ...state,
        generalRanking: [],
        userRanking: null,
        loading: true,
      };
    case GET_RANKING_SUCCESS:
      return {
        ...state,
        generalRanking: state.generalRanking.concat(action.ranking),
        userRanking: action.user,
        loading: false,
      };
    case GET_RANKING_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default rankingReducer;
