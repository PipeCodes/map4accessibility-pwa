import { UPSERT_VISITED_PLACES } from '../actions/types';

const initialState = {
  history: [],
};

const historyReducer = (state = initialState, action) => {
  const { history } = action;
  switch (action.type) {
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
