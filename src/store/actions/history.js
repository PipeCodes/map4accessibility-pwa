import moment from 'moment';
import { UPSERT_VISITED_PLACES, RESET_VISITED_PLACES } from './types';

export const storePlace = (place, visitedHistory) => async (dispatch) => {
  if (typeof visitedHistory === 'string') {
    dispatch({ type: RESET_VISITED_PLACES });
  }
  const visitedPlaceData = {
    id: Number(place.id),
    place_name: place.name,
    place_image: place?.media_evaluations[0] || '',
    place_city: place.city,
    date: moment(new Date()).format(),
  };

  if (visitedHistory === undefined || visitedHistory === null) {
    visitedHistory = [];
  }
  visitedHistory.push(visitedPlaceData);
  dispatch({ type: UPSERT_VISITED_PLACES, history: visitedHistory });
};

export const resetHistory = () => async (dispatch) => {
  dispatch({ type: RESET_VISITED_PLACES });
};
