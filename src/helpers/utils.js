/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable one-var */

import DangerIcon from '../assets/icons/maps/red-alert-icon.svg';
import DefaultIcon from '../assets/icons/maps/default.svg';

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

export const markerIcon = (type) => {
  if (type === 'danger') {
    return DangerIcon;
  }
  return DefaultIcon;
};

export const googleMapsLink = (origin, destination) =>
  typeof origin === 'string'
    ? 'https://www.google.com/maps/dir/'
        .concat(origin)
        .concat('/')
        .concat(destination)
    : 'https://www.google.com/maps/dir/'
        .concat(origin.lat)
        .concat(',')
        .concat(origin.lng)
        .concat('/')
        .concat(destination);
