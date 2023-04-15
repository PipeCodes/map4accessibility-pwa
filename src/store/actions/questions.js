import axios, { Endpoints } from '../../services/api';
import {
  GET_QUESTIONS_START,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from './types';
import { HTTP_STATUS } from '../../constants';

import { getAuthToken } from '../../services/local';

// Gets questions for Evaluations from the API
export const getQuestions = () => async (dispatch) => {
  dispatch({ type: GET_QUESTIONS_START });

  const config = {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Accept-Language': 'en',
    },
  };

  try {
    const response = await axios.get(Endpoints.QUESTIONS, config);
    const statusCode = response.status;
    const questionsMandatory = [];
    const questionsOptional = {};

    if (statusCode === HTTP_STATUS.SUCCESS) {
      response.data?.result.questions.forEach((question) => {
        if (question?.is_mandatory) {
          questionsMandatory.push(question);
        } else {
          const sliced = question?.title?.split(':');
          if (questionsOptional[sliced[0]]) {
            questionsOptional[sliced[0]].push(question);
          } else {
            questionsOptional[sliced[0]] = [question];
          }
        }
      });
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        data: { mandatory: questionsMandatory, optional: questionsOptional },
      });
    }
  } catch (error) {
    dispatch({ type: GET_QUESTIONS_ERROR });
  }
};
