import axios, { Endpoints } from '../../services/api';
import { 
  GET_CYCLES_START, 
  GET_CYCLES_SUCCESS, 
  GET_CYCLES_ERROR } from './types';
import { HTTP_STATUS } from '../../constants';

export const getCycles = () => async (dispatch) => {
  dispatch({ type: GET_CYCLES_START });

  try {
    const response = await axios.get(Endpoints.CYCLES);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_CYCLES_SUCCESS,
        data: response.data?.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_CYCLES_ERROR });
  }
};
