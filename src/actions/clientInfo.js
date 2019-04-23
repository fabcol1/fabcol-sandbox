import { CURRENT_PAGE, CLEAR_CURRENT_PAGE } from './types';

export const setCurrentPage = curPage => {
  return {
    type: CURRENT_PAGE,
    payload: curPage,
  };
};
export const clearCurrentPage = () => {
  return {
    type: CLEAR_CURRENT_PAGE,
  };
};
