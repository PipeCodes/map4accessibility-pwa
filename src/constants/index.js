import FlagPortugal from '../assets/icons/flags/portugal.svg';
import FlagBelgium from '../assets/icons/flags/belgium.svg';
import FlagGermany from '../assets/icons/flags/germany.svg';
import MusicIcon from '../assets/icons/places/music-icon.svg';
import CoffeIcon from '../assets/icons/places/coffee-icon.svg';
import DangerIcon from '../assets/icons/places/danger-icon.svg';
import FlagUnitedKingdom from '../assets/icons/flags/united-kingdom.svg';
import FlagUnitedStates from '../assets/icons/flags/united-states.svg';

export const countries = [
  {
    id: 1,
    label: 'PT',
    icon: FlagPortugal,
  },
  {
    id: 2,
    label: 'BE',
    icon: FlagBelgium,
  },
  {
    id: 3,
    label: 'DE',
    icon: FlagGermany,
  },
  {
    id: 4,
    label: 'UK',
    icon: FlagUnitedKingdom,
  },
  {
    id: 5,
    label: 'US',
    icon: FlagUnitedStates,
  },
];

export const types = [
  {
    id: 1,
    label: 'danger',
    icon: DangerIcon,
  },

  {
    id: 2,
    label: 'attractions',
    icon: MusicIcon,
  },
  {
    id: 3,
    label: 'groceries',
    icon: CoffeIcon,
  },
];

export const options = ['A', 'B', 'C', 'D', 'E']; // List for Route Keys

// GENERAL STATUSES
export const SUCCESS = 'success';
export const ERROR = 'error';

// SOCIAL LOGIN PROVIDERS
export const PROVIDER_FB = 'facebook';
export const PROVIDER_GG = 'google';

// REGEX

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*^~+=`|\\[\](){}:;'<>ç,.?/"_-]{8,}$/;
export const REGEX_DATE = /^[0-9]{1,4}[-,/][0-9]{1,2}[-,/][0-9]{1,4}$/;

// HTTP STATUS
export const HTTP_STATUS = {
  UNHAUTORIZED: 401,
  FORBIDDEN: 403,
  SUCCESS: 200,
  SUCCESS_CREATED: 201,
  SUCCESS_ACCEPTED: 202,
  ERROR: 500,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

export const GOOGLE_MAPS_OPTIONS = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['places', 'geometry'],
};
