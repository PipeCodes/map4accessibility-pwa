import axios, { Endpoints, getErrorMessage } from '../../services/api';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  GET_USER_SUCCESS,
  LOGOUT,
} from './types';
import { HTTP_STATUS } from '../../constants';
import i18n from '../../i18n';

import {
  clearLocalStorage,
  getAuthToken,
  saveAuthToken,
} from '../../services/local';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_START });
  const body = {
    email: email?.trim(),
    password,
  };

  try {
    const response = await axios.post(Endpoints.LOGIN, body);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      saveAuthToken(response.data?.result?.authorization?.token);

      dispatch({
        type: AUTH_SUCCESS,
        user: response.data?.result?.user,
      });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR });

    return Promise.reject(
      error?.response?.data?.message ?? i18n.t('something_wrong'),
    );
  }
};

export const signup =
  (name, surname, birthdate, email, password, termsAccepted, disabilities) =>
  async (dispatch) => {
    dispatch({ type: AUTH_START });

    const body = {
      name,
      surname,
      birthdate,
      email: email?.trim().toLowerCase(),
      password,
      terms_accepted: termsAccepted,
      disabilities,
    };

    try {
      const response = await axios.post(Endpoints.SIGNUP, body);

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS_CREATED) {
        saveAuthToken(response.data?.result?.authorization?.token);
        dispatch({
          type: AUTH_SUCCESS,
          user: response.data?.result?.user,
        });
      }
    } catch (error) {
      dispatch({ type: AUTH_ERROR });

      return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
    }
  };

export const signupProviderGoogle =
  (email, name, surname, id) => async (dispatch) => {
    dispatch({ type: AUTH_START });

    const body = {
      email,
      name,
      surname,
      birthdate: '2022-10-20',
      terms_accepted: true,
      auth_providers: {
        gmail: id,
      },
    };

    try {
      const response = await axios.post(Endpoints.SIGNUP, body);
      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        saveAuthToken(response.data?.result?.authorization?.token);
        dispatch({
          type: AUTH_SUCCESS,
          user: response.data?.result?.user,
        });
      }
    } catch (error) {
      dispatch({ type: AUTH_ERROR });

      return Promise.reject(getErrorMessage(error, i18n.t('something_wrong')));
    }
  };

export const checkEmail = (email) => async () => {
  const body = {
    email: email?.trim(),
  };
  try {
    const response = await axios.post(Endpoints.CHECK_EMAIL, body);
    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      return Promise.resolve(false);
    }
  } catch (error) {
    if (error?.response?.data?.error_code === 409) {
      return Promise.resolve(true);
    }

    return Promise.reject(
      error?.response?.data?.message ?? i18n.t('something_wrong'),
    );
  }
};

export const recoverPassword = (emailOrUsername) => async (dispatch) => {
  dispatch({ type: AUTH_START });

  const body = {
    email_username: emailOrUsername?.trim(),
  };

  try {
    const response = await axios.post(Endpoints.RECOVER_PASSWORD, body);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: AUTH_SUCCESS,
      });

      return Promise.resolve(response?.data?.message);
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR });

    return Promise.reject(error?.response?.data?.message);
  }
};

export const changePassword = (token, newPassword) => async (dispatch) => {
  dispatch({ type: AUTH_START });

  const body = {
    token,
    new_password: newPassword,
  };

  try {
    const response = await axios.post(Endpoints.CHANGE_PASSWORD, body);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: AUTH_SUCCESS,
      });

      return Promise.resolve(response?.data?.message);
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR });

    return Promise.reject(error?.response?.data?.message);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });

  clearLocalStorage();

  window.location.replace(`${process.env.REACT_APP_URL}/`);
};

export const getUser = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  try {
    const response = await axios.get(Endpoints.GET_USER, config);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      const user = {
        ...response.data?.data?.user,
        quizzes_played: response.data?.data?.quizzes_played,
        quizzes_completed: response.data?.data?.quizzes_completed,
        points: response.data?.data?.points,
      };

      dispatch({
        type: GET_USER_SUCCESS,
        user,
      });
    }
  } catch (error) {
    const statusCode = error?.response?.status ?? HTTP_STATUS.ERROR;
    if (
      statusCode === HTTP_STATUS.UNHAUTORIZED ||
      statusCode === HTTP_STATUS.FORBIDDEN
    ) {
      dispatch(logout());
    }
  }
};

export const updateUser =
  (avatar, name, username, region, translate) => async (dispatch, getState) => {
    const body = {
      avatar,
      name,
      username: username?.trim(),
      region_id: region,
      _method: 'PATCH',
    };

    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    try {
      const response = await axios.post(Endpoints.UPDATE_USER, body, config);

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        const user = getState().auth.user;

        const updatedUser = {
          ...user,
          username: response.data?.data?.user?.username,
        };

        dispatch({
          type: GET_USER_SUCCESS,
          user: updatedUser,
        });

        return Promise.resolve(translate('profile_updated_successfully'));
      }
    } catch (error) {
      const statusCode = error?.response?.status ?? HTTP_STATUS.ERROR;
      if (
        statusCode === HTTP_STATUS.UNHAUTORIZED ||
        statusCode === HTTP_STATUS.FORBIDDEN
      ) {
        dispatch(logout());
      } else {
        return Promise.reject(
          getErrorMessage(error, translate('something_wrong')),
        );
      }
    }
  };
