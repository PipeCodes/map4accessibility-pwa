import {
  GET_ONBOARDING_ITEMS_START,
  GET_ONBOARDING_ITEMS_SUCCESS,
  GET_ONBOARDING_ITEMS_ERROR,
} from '../actions/types';

const initialState = {
  items: null,
  loading: false,
};

const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONBOARDING_ITEMS_START:
      return {
        ...state,
        items: [],
        loading: true,
      };
    case GET_ONBOARDING_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    case GET_ONBOARDING_ITEMS_ERROR:
      return {
        ...state,
        items: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default onboardingReducer;
