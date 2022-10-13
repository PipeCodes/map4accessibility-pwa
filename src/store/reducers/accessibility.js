import {
  ADD_FONT,
  SUB_FONT,
  RESET_FONT,
} from '../actions/types';

const initialState = {
  fontSize:'',
  font: '',
  color:'',
  underlineLinks:'',
  animations:'',
  styles:'',
  lighsOffMode:''
};


const accessibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FONT:
      return {

      };
    case SUB_FONT:
      return {

      };
    case RESET_FONT:
      return {

      };
    default:
      return state;
  }
};

export default accessibilityReducer;
