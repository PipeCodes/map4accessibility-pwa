import { useTranslation } from 'react-i18next';
import axios, { Endpoints, getErrorMessage } from '../../services/api';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  GET_USER_SUCCESS,
  LOGOUT,
} from './types';
import { HTTP_STATUS } from '../../constants';

import {
  clearLocalStorage,
  getAuthToken,
  saveUser,
  saveUserData,
} from '../../services/local';

export const login = (emailOrUsername, password) => async (dispatch) => {
  const { t } = useTranslation();
  dispatch({ type: AUTH_START });
  const body = {
    email_username: emailOrUsername?.trim(),
    password,
  };

  try {
    const response = await axios.post(Endpoints.LOGIN, body);

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      saveUserData(response.data?.data?._token, response.data?.data?.user);

      dispatch({
        type: AUTH_SUCCESS,
        user: response.data?.data?.user,
      });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR });

    return Promise.reject(
      error?.response?.data?.message ?? t('something_wrong'),
    );
  }
};

export const signup =
  (firstName, surname, birthDate, email, password, disabilities) =>
  async (dispatch) => {
    const { t } = useTranslation();
    dispatch({ type: AUTH_START });

    const body = {
      firstName,
      surname,
      birthDate,
      email: email?.trim().toLowerCase(),
      password,
      disabilities,
    };

    try {
      const response = await axios.post(Endpoints.SIGNUP, body);

      const statusCode = response.status;

      if (statusCode === HTTP_STATUS.SUCCESS) {
        saveUserData(response.data?.data?._token, response.data?.data?.user);
        dispatch({
          type: AUTH_SUCCESS,
          user: response.data?.data?.user,
        });
      }
    } catch (error) {
      // debugger;
      dispatch({ type: AUTH_ERROR });

      return Promise.reject(getErrorMessage(error, t('something_wrong')));
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

      saveUser(user);

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

        saveUser(updatedUser);

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
