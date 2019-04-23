import { CURRENT_PAGE, CLEAR_CURRENT_PAGE } from '../actions/types';

const MobileDetect = require('mobile-detect');
const md = new MobileDetect(window.navigator.userAgent);

const initialState = {
  currentPage: '',
  isMobileBrowser: md.mobile() ? true : false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CLEAR_CURRENT_PAGE:
      return {
        ...state,
        currentPage: '',
      };
    default:
      return state;
  }
}
