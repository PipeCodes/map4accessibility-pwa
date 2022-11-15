import axios, { Endpoints, getErrorMessage } from '../../services/api';
import { GET_PLACES_RANKING_START, GET_PLACES_RANKING_SUCCESS } from './types';
import { HTTP_STATUS } from '../../constants';
import i18n from '../../i18n';

export const getPlacesRadius =
  (lat, lon, geoQueryRadius) => async (dispatch) => {
    dispatch({ type: GET_PLACES_RANKING_START });
    const body = {
      latitude: lat,
      longitude: lon,
      geo_query_radius: geoQueryRadius,
      asc_order_by: 'thumb_direction',
      desc_order_by: 'thumb_direction',
      page: 1,
      per_page: 10,
    };

    try {
      const response = await axios.post(Endpoints.PLACE_EVALUTATIONS, body);

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        dispatch({
          type: GET_PLACES_RANKING_SUCCESS,
          ranking: response.data?.result ?? [],
        });
      }
    } catch (error) {
      return Promise.reject(error?.response?.data?.message);
    }
  };
