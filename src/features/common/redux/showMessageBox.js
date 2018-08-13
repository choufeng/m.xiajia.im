// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_SHOW_MESSAGE_BOX,
} from './constants';

export function showMessageBox(msg, messageType) {
  return {
    type: COMMON_SHOW_MESSAGE_BOX,
    message: msg,
    messageType: messageType
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SHOW_MESSAGE_BOX:
      return {
        ...state,
        messageOpenStatus: true,
        message: action.message,
        messageType: action.messageType
      };

    default:
      return state;
  }
}
