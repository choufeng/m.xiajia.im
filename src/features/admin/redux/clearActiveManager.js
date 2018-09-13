// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ADMIN_CLEAR_ACTIVE_MANAGER,
} from './constants';

export function clearActiveManager() {
  return {
    type: ADMIN_CLEAR_ACTIVE_MANAGER,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_CLEAR_ACTIVE_MANAGER:
      return {
        ...state,
        activeManager: {}
      };

    default:
      return state;
  }
}
