import { generatePath } from 'react-router-dom';
import { HTTP_STATUS } from '../../constants';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import { getAuthToken } from '../../services/local';
import i18n from '../../i18n';

import {
  GET_PLACE_EVALUATIONS_SUCCESS,
  GET_PLACE_EVALUATIONS_START,
} from './types';

const config = {
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'multipart/form-data',
  },
};

export const getMyPlaceEvaluations = () => async (dispatch) => {
  dispatch({ type: GET_PLACE_EVALUATIONS_START });
  const queryParams = {
    page: 1,
    size: 10,
  };
  const url = generatePath(
    Endpoints.MY_PLACE_EVALUTATIONS.concat('?page=:page&size=:size'),
    queryParams,
  );

  try {
    const response = await axios.get(url, config);

    const statusCode = response.status;
    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_PLACE_EVALUATIONS_SUCCESS,
        evaluations: response.data?.result?.data ?? {},
      });
    }
  } catch (error) {
    return Promise.reject(error?.response?.data?.message);
  }
};

export const postPlaceEvaluation =
  (thumbDirection, comment, answers, latitude, longitude) => async () => {
    const body = {
      thumb_direction: thumbDirection,
      comment,
      question_answers: answers,
      latitude,
      longitude,
    };

    try {
      const response = await axios.post(
        Endpoints.PLACE_EVALUTATIONS,
        body,
        config,
      );

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        return Promise.resolve(response?.data?.result.id);
      }
    } catch (error) {
      return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
    }
  };

export const postPlaceEvaluationMedia = (media, id) => async () => {
  const body = {
    media,
  };

  const queryParams = {
    id,
  };

  const url = generatePath(
    Endpoints.PLACE_EVALUTATIONS.concat('/:id/media'),
    queryParams,
  );

  try {
    const response = await axios.post(url, body, config);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS_CREATED) {
      return Promise.resolve(response?.data?.message);
    }
  } catch (error) {
    return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
  }
};
