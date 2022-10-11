import {
  GET_FAQS_START,
  GET_FAQS_SUCCESS,
  GET_FAQS_ERROR,
} from '../actions/types';

const initialState = {
  faqs: null,
  loading: false,
};

const faqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAQS_START:
      return {
        ...state,
        faqs: [],
        loading: true,
      };
    case GET_FAQS_SUCCESS:
      return {
        ...state,
        faqs: action.data,
        loading: false,
      };
    case GET_FAQS_ERROR:
      return {
        ...state,
        faqs: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default faqsReducer;
