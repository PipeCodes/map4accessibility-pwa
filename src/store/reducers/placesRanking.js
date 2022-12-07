import {
  GET_PLACES_RANKING_START,
  GET_PLACES_RANKING_SUCCESS,
} from '../actions/types';

const initialState = {
  ranking: null,
  loading: false,
};

const placesRankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACES_RANKING_START:
      return {
        ...state,
        ranking: [],
        loading: true,
      };
    case GET_PLACES_RANKING_SUCCESS:
      return {
        ...state,
        ranking: state.ranking.concat(action.ranking),
        loading: false,
      };

    default:
      return state;
  }
};

export default placesRankingReducer;
