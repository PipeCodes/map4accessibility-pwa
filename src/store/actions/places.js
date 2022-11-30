import { generatePath } from 'react-router-dom';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import { GET_PLACES_RANKING_START, GET_PLACES_RANKING_SUCCESS } from './types';
import { HTTP_STATUS } from '../../constants';

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
    const response = await axios.get(url);

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
      const response = await axios.get(url);
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

export const getPlacesRadiusMarkers =
  (latitude, longitude, radius) => async (dispatch) => {
    dispatch({ type: GET_PLACES_RANKING_START });
    const queryParams = {
      latitude,
      longitude,
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
      const response = await axios.get(url);
      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        return response.data?.result.data ?? [];
      }
    } catch (error) {
      return Promise.reject(error?.response?.data?.message);
    }
  };
