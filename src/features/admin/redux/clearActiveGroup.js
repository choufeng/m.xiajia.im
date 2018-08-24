// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ADMIN_CLEAR_ACTIVE_GROUP,
} from './constants';

export function clearActiveGroup() {
  return {
    type: ADMIN_CLEAR_ACTIVE_GROUP,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_CLEAR_ACTIVE_GROUP:
      return {
        ...state,
        activeGroup: {}
      };

    default:
      return state;
  }
}
