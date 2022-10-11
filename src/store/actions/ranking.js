import axios, { Endpoints } from '../../services/api';
import {
  GET_RANKING_ERROR,
  GET_RANKING_START,
  GET_RANKING_SUCCESS,
} from './types';
import { HTTP_STATUS } from '../../constants';
import { logout } from './auth';
import { getAuthToken } from '../../services/local';

export const getRanking = (region) => async (dispatch) => {
  dispatch({ type: GET_RANKING_START });

  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  const endpoint = region
    ? `${Endpoints.RANKING}?region=${region}`
    : Endpoints.RANKING;

  try {
    const response = await axios.get(endpoint, config);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_RANKING_SUCCESS,
        ranking: response.data?.data?.ranking ?? [],
        user: response.data?.data?.user,
      });
    }
  } catch (error) {
    dispatch({ type: GET_RANKING_ERROR });
    const statusCode = error?.response?.status ?? HTTP_STATUS.ERROR;
    if (
      statusCode === HTTP_STATUS.UNHAUTORIZED ||
      statusCode === HTTP_STATUS.FORBIDDEN
    ) {
      dispatch(logout());
    } else {
      return Promise.reject(error?.response?.data?.message);
    }
  }
};
