import { UPSERT_VISITED_PLACES, RESET_VISITED_PLACES } from '../actions/types';

const initialState = {
  history: [],
};

const historyReducer = (state = initialState, action) => {
  const { history } = action;
  switch (action.type) {
    case RESET_VISITED_PLACES:
      return {
        initialState,
      };
    case UPSERT_VISITED_PLACES:
      return {
        ...state,
        history,
      };

    default:
      return state;
  }
};

export default historyReducer;
