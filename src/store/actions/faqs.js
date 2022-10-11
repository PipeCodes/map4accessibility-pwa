import axios, { Endpoints } from '../../services/api';
import { GET_FAQS_START, GET_FAQS_SUCCESS, GET_FAQS_ERROR } from './types';
import { HTTP_STATUS } from '../../constants';

export const getFAQs = () => async (dispatch) => {
  dispatch({ type: GET_FAQS_START });

  try {
    const response = await axios.get(Endpoints.FAQS);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_FAQS_SUCCESS,
        data: response.data?.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_FAQS_ERROR });
  }
};