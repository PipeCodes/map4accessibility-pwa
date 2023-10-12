import axios from 'axios';
import * as Endpoints from './endpoints';
import { AVAILABLE_LANGUAGES } from '../../constants';

export { Endpoints };

const getAcceptLanguage = () => {
  // eslint-disable-next-line no-undef
  const langCode = navigator?.language.slice(0, 2);
  return AVAILABLE_LANGUAGES.includes(langCode) ? langCode : 'en';
};

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': process.env.REACT_APP_API_STATIC_KEY,
    // eslint-disable-next-line no-undef
    'Accept-Language': getAcceptLanguage(),
  },
});

export const getErrorMessage = (error, defaultMessage) => {
  let message = error?.response?.data?.message;

  if (message) {
    const errors = Object.values(error?.response?.data?.errors);

    if (errors) {
      message += '\n';
    }

    errors?.forEach((validations) => {
      validations.forEach((validation) => {
        message += `\n${validation}`;
      });
    });

    return message;
  }

  return defaultMessage;
};
