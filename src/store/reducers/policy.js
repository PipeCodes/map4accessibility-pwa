import {
  GET_POLICY_START,
  GET_POLICY_SUCCESS,
  GET_POLICY_ERROR,
} from '../actions/types';

const initialState = {
  policy: null,
  loading: false,
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POLICY_START:
      return {
        ...state,
        policy: null,
        loading: true,
      };
    case GET_POLICY_SUCCESS:
      return {
        ...state,
        policy: action.data,
        loading: false,
      };
    case GET_POLICY_ERROR:
      return {
        ...state,
        policy: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default policyReducer;
