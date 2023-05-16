/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable one-var */

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
import placeholder from '../assets/images/photo-stock-1.png';
import {
  food,
  publicService,
  lodging,
  cultureLeisure,
  transport,
  hospital,
} from '../constants/placeGroups';

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

export const markerIcon = (type) => {
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
