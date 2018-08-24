// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ADMIN_SET_ACTIVE_GROUP,
} from './constants';

export function setActiveGroup(id) {
  return {
    type: ADMIN_SET_ACTIVE_GROUP,
    id: id
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_SET_ACTIVE_GROUP:
      return {
        ...state,
        activeGroup: action.id
      };

    default:
      return state;
  }
}
