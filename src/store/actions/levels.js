import axios, { Endpoints } from '../../services/api';
import {
  GET_LEVELS_START,
  GET_LEVELS_SUCCESS,
  GET_LEVELS_ERROR } from './types';
import { HTTP_STATUS } from '../../constants';
import { getAuthToken } from '../../services/local';

export const getLevels = (cycleId) => async (dispatch) => {
  dispatch({ type: GET_LEVELS_START });

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };
  
    const response = await axios.get(
      Endpoints.LEVELS.replace(':cycle_id:', cycleId),
      config,
    );

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_LEVELS_SUCCESS,
        data: response.data?.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_LEVELS_ERROR });
  }
};
