import {
  GET_ONBOARDING_ITEMS_START,
  GET_ONBOARDING_ITEMS_SUCCESS,
  GET_ONBOARDING_ITEMS_ERROR,
} from './types';

export const getOnboardingItems = () => async (dispatch) => {
  dispatch({ type: GET_ONBOARDING_ITEMS_START });

  try {
    dispatch({
      type: GET_ONBOARDING_ITEMS_SUCCESS,
      data: [{
        title: "aa",
        icon: "bb",
        body: "cc"
      }],
    });
  } catch (error) {
    dispatch({ type: GET_ONBOARDING_ITEMS_ERROR });
  }
};
