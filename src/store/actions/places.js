import { generatePath } from 'react-router-dom';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import i18n from '../../i18n';
import {
  GET_PLACES_RANKING_START,
  GET_PLACES_RANKING_SUCCESS,
  GET_PLACES_RANKING_ERROR,
  GET_PLACE_SUCCESS,
  GET_PLACE_START,
} from './types';
import { HTTP_STATUS } from '../../constants';
import { getAuthToken } from '../../services/local';

const config = {
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'multipart/form-data',
  },
};

export const getPlace = (id) => async (dispatch) => {
  dispatch({ type: GET_PLACE_START });
  const queryParams = {
    id,
  };
  const url = generatePath(Endpoints.PLACES.concat(':id'), queryParams);

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

export const getPlacesCountry = (country, order) => async (dispatch) => {
  dispatch({ type: GET_PLACES_RANKING_START });
  const queryParams = {
    country_code: country,
    desc_order_by: order,
    page: 1,
    size: 10,
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
    return Promise.reject(error?.response?.data?.message);
  }
};

export const getPlacesRadius =
  (latitude, longitude, order, radius) => async (dispatch) => {
    dispatch({ type: GET_PLACES_RANKING_START });
    const queryParams = {
      latitude,
      longitude,
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
      return Promise.reject(error?.response?.data?.message);
    }
  };

export const getPlacesByLocation = (order, radius) => async (dispatch) => {
  dispatch({ type: GET_PLACES_RANKING_START });

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const queryParams = {
        latitude,
        longitude,
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

      axios
        .get(url, config)
        .then((response) => {
          const statusCode = response.status;

          if (statusCode === HTTP_STATUS.SUCCESS) {
            dispatch({
              type: GET_PLACES_RANKING_SUCCESS,
              ranking: response.data?.result.data ?? [],
            });
          }
        })
        .catch((error) => Promise.reject(error?.response?.data?.message));
    },
    (error) => {
      dispatch({
        type: GET_PLACES_RANKING_ERROR,
      });
      Promise.reject(error);
    },
  );
};

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
      return Promise.reject(error?.response?.data?.message);
    }
  };

export const postPlace = (name, type, city, location, country) => async () => {
  const body = {
    name,
    place_type: type,
    city,
    latitude: location.lat,
    longitude: location.lng,
    country_code: country,
  };

  try {
    const response = await axios.post(Endpoints.PLACES, body, config);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      return Promise.resolve(response?.data?.result.id);
    }
  } catch (error) {
    return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
  }
};

export const postPlaceMedia = (media, id) => async () => {
  const body = {
    media,
  };

  const queryParams = {
    id,
  };

  const url = generatePath(Endpoints.PLACES.concat(':id/media'), queryParams);

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
