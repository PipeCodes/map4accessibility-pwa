import moment from 'moment';
import { REGEX_DATE, REGEX_PASSWORD, REGEX_EMAIL } from '../../constants';

export const validateFirstName = (firstName) => {
  let error = null;
  if (!firstName) {
    error = 'required_firstName';
  } else if (typeof firstName !== 'string') {
    error = 'string_firstName';
  }
  return error;
};

export const validateSurname = (surname) => {
  let error = null;
  if (!surname) {
    error = 'required_surname';
  } else if (typeof surname !== 'string') {
    error = 'string_surname';
  }
  return error;
};

export const validateBirthDate = (birthDate) => {
  const startBirthDateValidation = moment().subtract(100, 'years');
  const endBirthDateValidation = moment().subtract(16, 'years');

  let error = null;
  if (!REGEX_DATE.test(birthDate) && birthDate !== '') {
    error = 'invalid_birthDate';
  } else if (
    birthDate &&
    !moment(birthDate).isBetween(
      startBirthDateValidation,
      endBirthDateValidation,
    )
  ) {
    error = 'invalid_is_between_birthDate';
  }
  return error;
};

export const validateEmail = (email, duplicate) => {
  let error = null;
  if (!email) {
    error = 'required_email';
  } else if (!REGEX_EMAIL.test(email)) {
    error = 'invalid_email';
  } else if (duplicate) {
    error = 'duplicate_email';
  }
  return error;
};

export const validateEmailExists = (email, exists) => {
  let error = null;
  if (!email) {
    error = 'required_email';
  } else if (!REGEX_EMAIL.test(email)) {
    error = 'invalid_email';
  } else if (exists === false) {
    error = 'no_email';
  }
  return error;
};

export const validatePassword = (password, confirmPassword) => {
  let error = null;
  if (!password) {
    error = 'required_password';
  } else if (password !== confirmPassword) {
    error = 'passwords_match';
  } else if (!REGEX_PASSWORD.test(password)) {
    error = 'password_rules';
  }
  return error;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  let error = null;
  if (!confirmPassword) {
    error = 'required_password';
  } else if (password !== confirmPassword) {
    error = 'passwords_match';
  }
  return error;
};

export const validatePolicy = (policy) => {
  let error = null;
  if (policy !== true) {
    error = 'privacy_policy_error';
  }
  return error;
};
