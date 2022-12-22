import moment from 'moment';
import { UPSERT_VISITED_PLACES } from './types';

const upsertPlace = (array, item) => {
  const i = array.findIndex((_item) => _item.id === item.id);
  if (i > -1) array[i] = item;
  else array.push(item);
  return array;
};

export const storePlace = (id, visitedHistory) => async (dispatch) => {
  const visitedPlaceData = {
    id: Number(id),
    place: id,
    date: moment(new Date()).format(),
  };
  let data;
  if (visitedHistory) {
    const storedVisitedPlaces = JSON.parse(visitedHistory);
    const updatedPlaceData = upsertPlace(storedVisitedPlaces, visitedPlaceData);
    data = JSON.stringify(updatedPlaceData);
  } else {
    data = JSON.stringify([visitedPlaceData]);
  }
  dispatch({ type: UPSERT_VISITED_PLACES, history: data });
};
