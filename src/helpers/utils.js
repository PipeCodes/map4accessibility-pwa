/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable one-var */

import CurrentLocationIcon from '../assets/icons/maps/markers/current-location.svg';

// Default Icons
import OtherObstacleIcon from '../assets/icons/maps/markers/place-other-obstacle.svg';
import PedestrianCrossIcon from '../assets/icons/maps/markers/place-pedestrians-cross.svg';
import RoadblockIcon from '../assets/icons/maps/markers/place-roadblock.svg';
import StepStairsIcon from '../assets/icons/maps/markers/place-step-stairs.svg';
import StreetWorksIcon from '../assets/icons/maps/markers/place-street-works.svg';
import TrafficLightIcon from '../assets/icons/maps/markers/place-traffic-light.svg';
import HospitalIcon from '../assets/icons/maps/markers/hospital.svg';
import CultureIcon from '../assets/icons/maps/markers/culture.svg';
import LodgingIcon from '../assets/icons/maps/markers/lodging.svg';
import PublicServiceIcon from '../assets/icons/maps/markers/public-service.svg';
import TransportIcon from '../assets/icons/maps/markers/transport.svg';
import FoodIcon from '../assets/icons/maps/markers/food.svg';
import DefaultIcon from '../assets/icons/maps/markers/default.svg';

// Green Icons
import OtherObstacleIconGreen from '../assets/icons/maps/markers_green/place-other-obstacle.svg';
import PedestrianCrossIconGreen from '../assets/icons/maps/markers_green/place-pedestrians-cross.svg';
import RoadblockIconGreen from '../assets/icons/maps/markers_green/place-roadblock.svg';
import StepStairsIconGreen from '../assets/icons/maps/markers_green/place-step-stairs.svg';
import StreetWorksIconGreen from '../assets/icons/maps/markers_green/place-street-works.svg';
import TrafficLightIconGreen from '../assets/icons/maps/markers_green/place-traffic-light.svg';
import HospitalIconGreen from '../assets/icons/maps/markers_green/hospital.svg';
import CultureIconGreen from '../assets/icons/maps/markers_green/culture.svg';
import LodgingIconGreen from '../assets/icons/maps/markers_green/lodging.svg';
import PublicServiceIconGreen from '../assets/icons/maps/markers_green/public-service.svg';
import TransportIconGreen from '../assets/icons/maps/markers_green/transport.svg';
import FoodIconGreen from '../assets/icons/maps/markers_green/food.svg';
import DefaultIconGreen from '../assets/icons/maps/markers_green/default.svg';

// Yellow Icons
import OtherObstacleIconYellow from '../assets/icons/maps/markers_yellow/place-other-obstacle.svg';
import PedestrianCrossIconYellow from '../assets/icons/maps/markers_yellow/place-pedestrians-cross.svg';
import RoadblockIconYellow from '../assets/icons/maps/markers_yellow/place-roadblock.svg';
import StepStairsIconYellow from '../assets/icons/maps/markers_yellow/place-step-stairs.svg';
import StreetWorksIconYellow from '../assets/icons/maps/markers_yellow/place-street-works.svg';
import TrafficLightIconYellow from '../assets/icons/maps/markers_yellow/place-traffic-light.svg';
import HospitalIconYellow from '../assets/icons/maps/markers_yellow/hospital.svg';
import CultureIconYellow from '../assets/icons/maps/markers_yellow/culture.svg';
import LodgingIconYellow from '../assets/icons/maps/markers_yellow/lodging.svg';
import PublicServiceIconYellow from '../assets/icons/maps/markers_yellow/public-service.svg';
import TransportIconYellow from '../assets/icons/maps/markers_yellow/transport.svg';
import FoodIconYellow from '../assets/icons/maps/markers_yellow/food.svg';
import DefaultIconYellow from '../assets/icons/maps/markers_yellow/default.svg';

// Red Icons
import OtherObstacleIconRed from '../assets/icons/maps/markers_red/place-other-obstacle.svg';
import PedestrianCrossIconRed from '../assets/icons/maps/markers_red/place-pedestrians-cross.svg';
import RoadblockIconRed from '../assets/icons/maps/markers_red/place-roadblock.svg';
import StepStairsIconRed from '../assets/icons/maps/markers_red/place-step-stairs.svg';
import StreetWorksIconRed from '../assets/icons/maps/markers_red/place-street-works.svg';
import TrafficLightIconRed from '../assets/icons/maps/markers_red/place-traffic-light.svg';
import HospitalIconRed from '../assets/icons/maps/markers_red/hospital.svg';
import CultureIconRed from '../assets/icons/maps/markers_red/culture.svg';
import LodgingIconRed from '../assets/icons/maps/markers_red/lodging.svg';
import PublicServiceIconRed from '../assets/icons/maps/markers_red/public-service.svg';
import TransportIconRed from '../assets/icons/maps/markers_red/transport.svg';
import FoodIconRed from '../assets/icons/maps/markers_red/food.svg';
import DefaultIconRed from '../assets/icons/maps/markers_red/default.svg';

import placeholder from '../assets/images/photo-stock-1.png';
import {
  food,
  publicService,
  lodging,
  cultureLeisure,
  transport,
  hospital,
} from '../constants/placeGroups';
import { MARKER_COLOR } from '../constants';

const photos = [placeholder, placeholder, placeholder];

// ///////////////////////////
//    Accessibility Utils   //
// ///////////////////////////

export const updateFontSize = (fontSize, incrementor) => {
  let newFontSize = fontSize + incrementor;
  if (newFontSize > 80) {
    newFontSize = 80;
  } else if (newFontSize < 12) {
    newFontSize = 12;
  }

  return `${newFontSize}px`;
};

export const updateValue = (defaultValue, newValue) => {
  if (newValue != null) {
    return newValue;
  }
  return defaultValue;
};

export const setUnderline = (defaultValue, underline) => {
  if (underline) {
    return 'underline';
  }
  return defaultValue;
};

export const setHighlight = (defaultValue, highlight) => {
  if (highlight) {
    return 'rgb(255,255,0)';
  }
  return defaultValue;
};

export const updateAnimations = (defaultValue, removeAnimations) => {
  if (removeAnimations) {
    return 'none';
  }
  return defaultValue;
};

export const setLightsOff = (defaultValue, lighsOffMode) => {
  if (lighsOffMode) {
    return 'block';
  }
  return defaultValue;
};

// ///////////////////////////
// Debouce for map dragging //
// ///////////////////////////

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// ///////////////////////////
//        Places Utils      //
// ///////////////////////////

export const markerIcon = (type, markerColor) => {
  if (markerColor === MARKER_COLOR.CURRENT_LOCATION) {
    return CurrentLocationIcon;
  }
  if (markerColor === MARKER_COLOR.GREEN) {
    switch (type) {
      case 'pedestrian_cross':
        return PedestrianCrossIconGreen;
      case 'roadblock':
        return RoadblockIconGreen;
      case 'street_works':
        return StreetWorksIconGreen;
      case 'faulty_traffic_light':
        return TrafficLightIconGreen;
      case 'step_stairs':
        return StepStairsIconGreen;
      case 'obstacle':
        return OtherObstacleIconGreen;
      case 'health':
        return HospitalIconGreen;
      case 'tourist_attraction':
        return CultureIconGreen;
      case 'lodging':
        return LodgingIconGreen;
      case 'local_government_office':
        return PublicServiceIconGreen;
      case 'transport':
        return TransportIconGreen;
      case 'restaurant':
        return FoodIconGreen;
      default:
        return DefaultIconGreen;
    }
  } else if (markerColor === MARKER_COLOR.YELLOW) {
    switch (type) {
      case 'pedestrian_cross':
        return PedestrianCrossIconYellow;
      case 'roadblock':
        return RoadblockIconYellow;
      case 'street_works':
        return StreetWorksIconYellow;
      case 'faulty_traffic_light':
        return TrafficLightIconYellow;
      case 'step_stairs':
        return StepStairsIconYellow;
      case 'obstacle':
        return OtherObstacleIconYellow;
      case 'health':
        return HospitalIconYellow;
      case 'tourist_attraction':
        return CultureIconYellow;
      case 'lodging':
        return LodgingIconYellow;
      case 'local_government_office':
        return PublicServiceIconYellow;
      case 'transport':
        return TransportIconYellow;
      case 'restaurant':
        return FoodIconYellow;
      default:
        return DefaultIconYellow;
    }
  } else if (markerColor === MARKER_COLOR.RED) {
    switch (type) {
      case 'pedestrian_cross':
        return PedestrianCrossIconRed;
      case 'roadblock':
        return RoadblockIconRed;
      case 'street_works':
        return StreetWorksIconRed;
      case 'faulty_traffic_light':
        return TrafficLightIconRed;
      case 'step_stairs':
        return StepStairsIconRed;
      case 'obstacle':
        return OtherObstacleIconRed;
      case 'health':
        return HospitalIconRed;
      case 'tourist_attraction':
        return CultureIconRed;
      case 'lodging':
        return LodgingIconRed;
      case 'local_government_office':
        return PublicServiceIconRed;
      case 'transport':
        return TransportIconRed;
      case 'restaurant':
        return FoodIconRed;
      default:
        return DefaultIconRed;
    }
  } else {
    switch (type) {
      case 'pedestrian_cross':
        return PedestrianCrossIcon;
      case 'roadblock':
        return RoadblockIcon;
      case 'street_works':
        return StreetWorksIcon;
      case 'faulty_traffic_light':
        return TrafficLightIcon;
      case 'step_stairs':
        return StepStairsIcon;
      case 'obstacle':
        return OtherObstacleIcon;
      case 'health':
        return HospitalIcon;
      case 'tourist_attraction':
        return CultureIcon;
      case 'lodging':
        return LodgingIcon;
      case 'local_government_office':
        return PublicServiceIcon;
      case 'transport':
        return TransportIcon;
      case 'restaurant':
        return FoodIcon;
      default:
        return DefaultIcon;
    }
  }
};

export const choosePlaceType = (types) => {
  if (typeof types === 'string') {
    return types;
  }
  let response;
  types?.forEach((value) => {
    if (food.includes(value)) {
      response = 'restaurant';
    }
    if (publicService.includes(value)) {
      response = 'local_government_office';
    }
    if (lodging.includes(value)) {
      response = 'lodging';
    }
    if (cultureLeisure.includes(value)) {
      response = 'tourist_attraction';
    }
    if (transport.includes(value)) {
      response = 'transport';
    }
    if (hospital.includes(value)) {
      response = 'health';
    }
  });
  return response;
};

// Reference https://gist.github.com/AmirHossein/92a0597b5f723b19c648
export const getCountryCity = (results, list) => {
  // If list exists then its already formated
  let city = null;
  let country = null;
  let counter;
  let counterLength;
  let component;
  if (list) {
    if (results) {
      results.forEach((result) => {
        if (!city && result?.types?.includes('locality')) {
          city = result?.long_name;
        } else if (!country && result?.types?.includes('country')) {
          country = result?.short_name;
        }
      });
    }
    return { country, city };
  }

  if (results[1]) {
    for (let r = 0, rl = results.length; r < rl; r += 1) {
      const result = results[r];
      if (!city && result.types[0] === 'locality') {
        for (
          counter = 0, counterLength = result.address_components.length;
          counter < counterLength;
          counter += 1
        ) {
          component = result.address_components[counter];

          if (component.types[0] === 'locality') {
            city = component.long_name;
            break;
          }
        }
      } else if (!country && result.types[0] === 'country') {
        country = result.address_components[0].short_name;
      }

      if (city && country) {
        break;
      }
    }
  }
  return { country, city };
};

export function getGoogleMapsUrl(origin, destination) {
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const params = {
    origin: typeof origin === 'string' ? origin : `${origin.lat},${origin.lng}`,
    destination,
    travelmode: 'walking',
    dir_action: 'navigate',
    // overview_polyline: 'enc:'.concat(overviewPolyline),
  };
  const queryParams = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${baseUrl}&${queryParams}`;
}

// ///////////////////////////
//        Images Utils      //
// ///////////////////////////

export const getMedia = (place) => {
  const pictures = [];
  let mediaType;

  const type = place?.media?.split('.').pop();
  if (type === 'mp3' || type === 'wav') {
    mediaType = 'audio';
  } else if (type === 'mp4') {
    mediaType = 'video';
  } else {
    mediaType = 'image';
  }

  const mainPicture = {
    file_type: mediaType,
    file_url: place?.media,
  };

  if (mainPicture?.file_url) pictures.push(mainPicture);
  place?.media_evaluations?.map((pic) => pictures.push(pic));
  return pictures?.length ? pictures : photos;
};

export const getFirstImage = (place) => {
  let mediaType;
  const type = place?.media?.split('.').pop();

  if (type === 'mp3' || type === 'wav') {
    mediaType = 'audio';
  } else if (type === 'mp4') {
    mediaType = 'video';
  } else {
    mediaType = 'image';
  }

  if (mediaType === 'image' && type) {
    return place?.media;
  }

  const image = place?.media_evaluations?.find(
    (media) => media?.file_type === 'image',
  );

  if (image) {
    return image;
  }

  return placeholder;
};

export const isDefined = (item) =>
  item !== 'null' && item !== 'NaN' && item !== 'undefined';

// ///////////////////////////
//        Others Utils      //
// ///////////////////////////

export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const storageUrl = (url) => {
  const array = url.split('/');
  if (array[0] === 'storage') {
    return '';
  }
  return '/storage';
};

export const getMarkerColor = (obj) => {
  let maxKey = null;
  let maxValue = Number.NEGATIVE_INFINITY;
  let count = 0;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'number') {
      if (value > maxValue) {
        maxKey = key;
        maxValue = value;
        count = 1;
      } else if (value === maxValue) {
        count++;
      }
    }
  });

  return count === Object.keys(obj).length ? 'default' : maxKey;
};
