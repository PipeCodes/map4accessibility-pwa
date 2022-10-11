import axios from 'axios';
import * as Endpoints from './endpoints';

export { Endpoints };

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Api-Static-Key': process.env.REACT_APP_API_STATIC_KEY,
    'Accept-Language': navigator?.language || 'en-GB'
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
