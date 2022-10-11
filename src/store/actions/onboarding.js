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
        title: "TODO - Get from Translations",
        icon: "TODO - Get from Translations",
        body: "TODO - Get from Translations"
      }],
    });
  } catch (error) {
    dispatch({ type: GET_ONBOARDING_ITEMS_ERROR });
  }
};
