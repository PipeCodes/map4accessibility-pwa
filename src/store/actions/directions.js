import { SET_ROUTE, SET_DIRECTIONS } from './types';
import { options } from '../../constants/index';
import i18n from '../../i18n';

// Sets the Currently selected Route in the Route-Planner Feature
export const changeRouteId = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_ROUTE, id });
    return Promise.resolve('Success');
  } catch (error) {
    return Promise.reject(error?.response?.data?.message);
  }
};

// Sets the Current Directions in the Route-Planner Feature
export const changeDirections =
  (results, verifiedRatings, verifiedMarkers, originRoute, destinationRoute) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SET_DIRECTIONS,
        results,
        routes: results.routes.map((route, index) => ({
          id: index,
          key: options[index],
          name: i18n.t('route'),
          distance: route.legs[0].distance.text,
          likes: verifiedRatings[index].likes,
          dislikes: verifiedRatings[index].dislikes,
          neutrals: verifiedRatings[index].neutrals,
          steps: [route.legs[0].steps],
          origin: originRoute,
          destination: destinationRoute,
          markers: verifiedMarkers[index],
        })),
      });
      return Promise.resolve('Success');
    } catch (error) {
      return Promise.reject(error?.response?.data?.message);
    }
  };
