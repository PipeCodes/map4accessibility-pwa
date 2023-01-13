import { generatePath } from 'react-router-dom';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import i18n from '../../i18n';
import {
  GET_PLACES_RANKING_START,
  GET_PLACES_RANKING_SUCCESS,
  GET_PLACES_RANKING_ERROR,
  GET_PLACE_START,
  GET_PLACE_SUCCESS,
  GET_PLACE_ERROR,
  POST_PLACE_START,
  POST_PLACE_SUCCESS,
  POST_PLACE_ERROR,
  RESET_ROUTES,
  RESET_PLACE_STATE,
} from './types';
import { HTTP_STATUS } from '../../constants';
import { getAuthToken } from '../../services/local';
import { getCurrentLocation } from '../../services/geolocation';
import { camelToSnakeCase } from '../../helpers/utils';

// Gets Single Place by ID
export const getPlace = (id) => async (dispatch) => {
  dispatch({ type: GET_PLACE_START });
  const queryParams = {
    id,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };
  const url = generatePath(Endpoints.PLACES.concat('/:id'), queryParams);
  try {
    const response = await axios.get(url, config);
    const statusCode = response.status;
    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_PLACE_SUCCESS,
        place: response.data?.result ?? {},
      });
    }
  } catch (error) {
    dispatch({ type: GET_PLACE_ERROR });
    return Promise.reject(error?.response?.data?.message);
  }
};

// Gets top 10 places By Country and Order
export const getPlacesCountry = (country, order) => async (dispatch) => {
  dispatch({ type: GET_PLACES_RANKING_START });
  const queryParams = {
    country_code: country,
    desc_order_by: order,
    page: 1,
    size: 10,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };
  const url = generatePath(
    Endpoints.PLACES.concat(
      '?country_code=:country_code&desc_order_by=:desc_order_by&page=:page&size=:size',
    ),
    queryParams,
  );
  try {
    const response = await axios.get(url, config);
    const statusCode = response.status;
    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_PLACES_RANKING_SUCCESS,
        ranking: response.data?.result.data ?? [],
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PLACES_RANKING_ERROR,
    });
    return Promise.reject(error?.response?.data?.message);
  }
};

// Gets Places By Current Location
export const getPlacesByLocation = (order, radius) => async (dispatch) => {
  dispatch({ type: GET_PLACES_RANKING_START });
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };
  try {
    const location = await getCurrentLocation();
    const queryParams = {
      latitude: location.lat,
      longitude: location.lng,
      desc_order_by: order,
      geo_query_radius: radius,
      page: 1,
      size: 10,
    };
    const url = generatePath(
      Endpoints.PLACES_RADIUS.concat(
        '?latitude=:latitude&longitude=:longitude&geo_query_radius=:geo_query_radius&desc_order_by=:desc_order_by&page=:page&size=:size',
      ),
      queryParams,
    );
    const response = await axios.get(url, config);
    const statusCode = response.status;
    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_PLACES_RANKING_SUCCESS,
        ranking: response.data?.result.data ?? [],
      });
    }
  } catch (error) {
    dispatch({ type: GET_PLACES_RANKING_ERROR });
    return Promise.reject(error?.response?.data?.message || error);
  }
};

// Gets Markers Around Coordinates
export const getPlacesRadiusMarkers =
  (latitude, longitude, radius) => async (dispatch) => {
    dispatch({ type: GET_PLACES_RANKING_START });
    const queryParams = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      geo_query_radius: radius,
      page: 1,
      size: 10,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };
    const url = generatePath(
      Endpoints.PLACES_RADIUS.concat(
        '?latitude=:latitude&longitude=:longitude&geo_query_radius=:geo_query_radius&page=:page&size=:size',
      ),
      queryParams,
    );
    try {
      const response = await axios.get(url, config);
      const statusCode = response.status;
      if (statusCode === HTTP_STATUS.SUCCESS) {
        return response.data?.result.data ?? [];
      }
    } catch (error) {
      const errorMessage =
        radius === 0 ? i18n.t('radius_error') : error?.response?.data?.message;
      dispatch({ type: RESET_ROUTES });
      return Promise.reject(errorMessage);
    }
  };

export const resetPlaceState = () => (dispatch) => {
  dispatch({ type: RESET_PLACE_STATE });
};

// Creates a new Place
export const postPlace =
  (name, type, city, location, country, media) => async (dispatch) => {
    dispatch({ type: POST_PLACE_START });
    const body = {
      name,
      place_type: type,
      city,
      latitude: location.lat,
      longitude: location.lng,
      country_code: country,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    try {
      const response = await axios.post(Endpoints.PLACES, body, config);

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        if (!media) {
          dispatch({ type: POST_PLACE_SUCCESS });
        }

        return Promise.resolve(response?.data?.result.id);
      }
    } catch (error) {
      dispatch({ type: POST_PLACE_ERROR });
      if (error?.response?.status === HTTP_STATUS.CONFLICT) {
        return Promise.reject(i18n.t('place_conflict'));
      }
      return Promise.reject(
        getErrorMessage(error?.message, i18n.t('something_wrong')),
      );
    }
  };

// Adds the media to the new place
export const postPlaceMedia = (media, id) => async (dispatch) => {
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
  const url = generatePath(Endpoints.PLACES.concat(':id/media'), queryParams);
  try {
    const response = await axios.post(url, body, config);
    const statusCode = response.status;
    if (statusCode === HTTP_STATUS.SUCCESS_CREATED) {
      dispatch({ type: POST_PLACE_SUCCESS });
      return Promise.resolve(response?.data?.message);
    }
  } catch (error) {
    dispatch({ type: POST_PLACE_ERROR });
    return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
  }
};

// Deletes Place
export const deletePlace = (userId, placeId) => async () => {
  const body = {
    place_id: placeId,
    app_user_id: userId,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };
  try {
    const response = await axios.post(Endpoints.PLACES_DELETE, body, config);
    const statusCode = response.status;
    if (statusCode === HTTP_STATUS.SUCCESS) {
      return Promise.resolve(response?.data?.result);
    }
  } catch (error) {
    return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
  }
};

const concatPlacesRequest = (params) =>
  Object.keys(params)
    .map((key) => `?${camelToSnakeCase(key)}=:${camelToSnakeCase(key)}`)
    .join('&');

export const getPlaceByParams = (params) => async (dispatch) => {
  const { name, placeType } = params;
  dispatch({ type: GET_PLACE_START });
  const queryParams = {};
  if (name) Object.assign(queryParams, { name });
  if (placeType) Object.assign(queryParams, { place_type: placeType });

  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };
  const url = generatePath(
    Endpoints.PLACES.concat(concatPlacesRequest(params)),
    queryParams,
  );

  try {
    const response = await axios.get(url, config);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_PLACE_SUCCESS,
        place: response.data?.result ?? {},
      });
    }
  } catch (error) {
    return Promise.reject(error?.response?.data?.message);
  }
};
