import { generatePath } from 'react-router-dom';
import { HTTP_STATUS } from '../../constants';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import { getAuthToken } from '../../services/local';
import i18n from '../../i18n';

import {
  GET_PLACE_EVALUATIONS_SUCCESS,
  GET_PLACE_EVALUATIONS_START,
  GET_PLACE_EVALUATIONS_SUMS,
} from './types';

const config = {
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'multipart/form-data',
  },
};

// Gets the user's place Evaluations
export const getMyPlaceEvaluations = () => async (dispatch) => {
  dispatch({ type: GET_PLACE_EVALUATIONS_START });
  const queryParams = {
    page: 1,
    size: 100,
  };
  const url = generatePath(
    Endpoints.MY_PLACE_EVALUTATIONS.concat('?page=:page&size=:size'),
    queryParams,
  );

  try {
    const response = await axios.get(url, config);
    const statusCode = response.status;
    const sums = {
      accepted: response?.data?.result?.total_accepted,
      pending: response?.data?.result?.total_pending,
      rejected: response?.data?.result?.total_rejected,
      negative: response?.data?.result?.total_thumbs_down,
      positive: response?.data?.result?.total_thumbs_up,
    };
    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_PLACE_EVALUATIONS_SUCCESS,
        evaluations: response.data?.result?.data ?? {},
      });
      dispatch({
        type: GET_PLACE_EVALUATIONS_SUMS,
        sums: sums ?? {},
      });
    }
    return;
  } catch (error) {
    return Promise.reject(error?.response?.data?.message);
  }
};

// Sends a new place evaluation to the API
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

// Sends the media for the new place evaluation to the API
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
