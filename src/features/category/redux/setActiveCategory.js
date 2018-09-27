// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  CATEGORY_SET_ACTIVE_CATEGORY,
} from './constants';

export function setActiveCategory(item) {
  return {
    type: CATEGORY_SET_ACTIVE_CATEGORY,
    data: item
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CATEGORY_SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.data
      };

    default:
      return state;
  }
}
