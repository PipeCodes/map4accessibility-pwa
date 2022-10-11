import axios, { Endpoints } from '../../services/api';
import { GET_POLICY_START, GET_POLICY_SUCCESS, GET_POLICY_ERROR } from './types';
import { HTTP_STATUS } from '../../constants';

export const getPolicy = () => async (dispatch) => {
  dispatch({ type: GET_POLICY_START });

  try {
    const response = await axios.get(Endpoints.POLICY);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_POLICY_SUCCESS,
        data: response.data?.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_POLICY_ERROR });
  }
};
