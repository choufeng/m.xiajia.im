// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_OPEN_MESSAGE_BOX,
} from './constants';

export function openMessageBox() {
  return {
    type: COMMON_OPEN_MESSAGE_BOX,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_OPEN_MESSAGE_BOX:
    console.log('this is a open model fun')
      return {
        ...state,
        messageOpenStatus: true
      };

    default:
      return state;
  }
}
