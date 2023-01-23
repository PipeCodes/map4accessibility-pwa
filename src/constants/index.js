// Tags FOR ROUTE KEYS
export const options = ['A', 'B', 'C', 'D', 'E'];

// GENERAL STATUSES
export const SUCCESS = 'success';
export const ERROR = 'error';

// SOCIAL LOGIN PROVIDERS
export const PROVIDERS = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
};

// REGEX
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*^~+=`|\\[\](){}:;'<>ç,.?/"_-]{8,}$/;
export const REGEX_DATE = /^[0-9]{1,4}[-,/][0-9]{1,2}[-,/][0-9]{1,4}$/;

// IMAGE TYPES
export const IMAGE_TYPES =
  'image/png, image/jpg, image/jpeg, image/jpg,  image/webp, video/mp4, video/mp3, video/wav';

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

// GOOGLE MAPS OPTIONS FOR LOAD
export const GOOGLE_MAPS_OPTIONS = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['places', 'geometry'],
};
