import { generatePath } from 'react-router-dom';
import { HTTP_STATUS } from '../../constants';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import { getAuthToken } from '../../services/local';
import i18n from '../../i18n';

import {
  GET_PLACE_EVALUATIONS_SUCCESS,
  GET_PLACE_EVALUATIONS_START,
  GET_PLACE_EVALUATIONS_SUMS,
  POST_PLACE_EVALUATIONS_SUCCESS,
  POST_PLACE_EVALUATIONS_START,
  POST_PLACE_EVALUATIONS_ERROR,
  DELETE_PLACE_EVALUATIONS_SUCCESS,
  DELETE_PLACE_EVALUATIONS_START,
  DELETE_PLACE_EVALUATIONS_ERROR,
} from './types';

// Gets the user's place Evaluations
export const getMyPlaceEvaluations = () => async (dispatch) => {
  dispatch({ type: GET_PLACE_EVALUATIONS_START });

  const queryParams = {
    page: 1,
    size: 1000,
  };
  const url = generatePath(
    Endpoints.MY_PLACE_EVALUTATIONS.concat('?page=:page&size=:size'),
    queryParams,
  );
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  try {
    const response = await axios.get(url, config);
    const statusCode = response.status;
    const sums = {
      accepted: response?.data?.result?.total_accepted,
      pending: response?.data?.result?.total_pending,
      rejected: response?.data?.result?.total_rejected,
      positive: response?.data?.result?.total_accessible,
      negative: response?.data?.result?.total_inaccessible,
      neutral: response?.data?.result?.total_neutral,
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
  } catch (error) {
    return Promise.reject(error?.response?.data?.message);
  }
};

// Sends a new place evaluation to the API
export const postPlaceEvaluation =
  (
    thumbDirection,
    name,
    comment,
    answers,
    latitude,
    longitude,
    media,
    city,
    countryCode,
    placeType,
    googlePlaceId,
    disabilities,
  ) =>
  async (dispatch) => {
    dispatch({ type: POST_PLACE_EVALUATIONS_START });
    const body = {
      evaluation: thumbDirection,
      name,
      comment,
      questions_answers: answers,
      latitude,
      longitude,
      google_place_id: googlePlaceId,
      city,
      country_code: countryCode,
      place_type: placeType,
      disabilities,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    try {
      const response = await axios.post(
        Endpoints.PLACE_EVALUTATIONS,
        body,
        config,
      );

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        if (!media) {
          dispatch({ type: POST_PLACE_EVALUATIONS_SUCCESS });
        }
        return Promise.resolve(response?.data?.result);
      }
    } catch (error) {
      dispatch({ type: POST_PLACE_EVALUATIONS_ERROR });
      return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
    }
  };

// Deletes a user evaluation
export const deletePlaceEvaluation = (commentToRemove) => async (dispatch) => {
  dispatch({ type: DELETE_PLACE_EVALUATIONS_START });

  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  try {
    const response = await axios.delete(
      Endpoints.PLACE_EVALUTATIONS.concat(`?commentId=${commentToRemove.id}`),
      config,
    );

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({ type: DELETE_PLACE_EVALUATIONS_SUCCESS });
      return Promise.resolve(commentToRemove.id);
    }
  } catch (error) {
    dispatch({ type: DELETE_PLACE_EVALUATIONS_ERROR });
    return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
  }
};

// Sends the media for the new place evaluation to the API
export const postPlaceEvaluationMedia = (media, id) => async (dispatch) => {
  const body = {
    media,
  };

  const queryParams = {
    id,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const url = generatePath(
    Endpoints.PLACE_EVALUTATIONS.concat('/:id/media'),
    queryParams,
  );

  try {
    const response = await axios.post(url, body, config);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({ type: POST_PLACE_EVALUATIONS_SUCCESS });
      return Promise.resolve(response?.data?.message);
    }
  } catch (error) {
    dispatch({ type: POST_PLACE_EVALUATIONS_ERROR });
    return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
  }
};
