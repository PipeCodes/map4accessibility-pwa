import axios, { Endpoints } from '../../services/api';
import {
  GET_QUIZ_START,
  GET_QUIZ_SUCCESS,
  GET_QUIZ_ERROR,
  REGISTER_LAST_ANSWER_SUCCESS,
  RESET_QUIZ_STATE,
} from './types';
import { HTTP_STATUS } from '../../constants';
import { logout } from './auth';
import { getAuthToken } from '../../services/local';

export const getQuiz = (quizId) => async (dispatch) => {
  dispatch({ type: GET_QUIZ_START });

  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  };

  try {
    const response = await axios.get(
      Endpoints.QUIZ.replace(':quiz_id:', quizId),
      config,
    );

    const statusCode = response.status;

    if (statusCode === HTTP_STATUS.SUCCESS) {
      dispatch({
        type: GET_QUIZ_SUCCESS,
        quiz: response.data?.data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_QUIZ_ERROR });

    const statusCode = error?.response?.status ?? HTTP_STATUS.ERROR;
    if (
      statusCode === HTTP_STATUS.UNHAUTORIZED ||
      statusCode === HTTP_STATUS.FORBIDDEN
    ) {
      dispatch(logout());
    } else {
      return Promise.reject(error?.response?.data?.message);
    }
  }
};

export const registerAnswer =
  (questionId, answerId, isLastQuestion) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const body = {
      question_id: questionId,
      answer_id: answerId,
      is_last_question: isLastQuestion ? 1 : 0,
    };

    try {
      const response = await axios.post(
        Endpoints.REGISTER_ANSWER,
        body,
        config,
      );

      if (isLastQuestion) {
        const statusCode = response.status;

        if (statusCode === HTTP_STATUS.SUCCESS) {
          dispatch({
            type: REGISTER_LAST_ANSWER_SUCCESS,
            results: response.data?.data?.user_quiz,
          });
        }
      }
    } catch (error) {
      const statusCode = error?.response?.status ?? HTTP_STATUS.ERROR;
      if (
        statusCode === HTTP_STATUS.UNHAUTORIZED ||
        statusCode === HTTP_STATUS.FORBIDDEN
      ) {
        dispatch(logout());
      } else {
        return Promise.reject(error?.response?.data?.message);
      }
    }
  };

export const resetQuizState = () => (dispatch) => {
  dispatch({ type: RESET_QUIZ_STATE });
};
