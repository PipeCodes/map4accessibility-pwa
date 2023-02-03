import moment from 'moment';
import { UPSERT_VISITED_PLACES, RESET_VISITED_PLACES } from './types';
import { getFirstImage } from '../../helpers/utils';

export const storePlace = (place, visitedHistory) => async (dispatch) => {
  if (typeof visitedHistory === 'string') {
    dispatch({ type: RESET_VISITED_PLACES });
  }
  const image = getFirstImage(place);

  const visitedPlaceData = {
    id: Number(place.id),
    place_name: place.name,
    place_image: image,
    place_city: place.city,
    date: moment(new Date()).format(),
    google_place_id: place.google_place_id,
  };

  if (visitedHistory === undefined || visitedHistory === null) {
    visitedHistory = [];
  }
  visitedHistory.unshift(visitedPlaceData);
  dispatch({ type: UPSERT_VISITED_PLACES, history: visitedHistory });
};

export const resetHistory = () => async (dispatch) => {
  dispatch({ type: RESET_VISITED_PLACES });
};
