// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ARTICLE_SET_ARTICLE_LIST_PAGE,
} from './constants';

export function setArticleListPage(page) {
  return {
    type: ARTICLE_SET_ARTICLE_LIST_PAGE,
    data: page,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ARTICLE_SET_ARTICLE_LIST_PAGE:
      return {
        ...state,
        articleListPage: action.data,
      };

    default:
      return state;
  }
}
