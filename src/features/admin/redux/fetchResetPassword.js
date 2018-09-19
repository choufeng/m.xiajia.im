import {
  ADMIN_FETCH_RESET_PASSWORD_BEGIN,
  ADMIN_FETCH_RESET_PASSWORD_SUCCESS,
  ADMIN_FETCH_RESET_PASSWORD_FAILURE,
  ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR,
} from './constants';
import api from '../../../common/api'

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchResetPassword(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ADMIN_FETCH_RESET_PASSWORD_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = api.patch(`manager/reset-password/${args.id}`, {password: args.password})
      doRequest.then(
        (res) => {
          dispatch({
            type: ADMIN_FETCH_RESET_PASSWORD_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: ADMIN_FETCH_RESET_PASSWORD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchResetPasswordError() {
  return {
    type: ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_FETCH_RESET_PASSWORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchResetPasswordPending: true,
        fetchResetPasswordError: null,
      };

    case ADMIN_FETCH_RESET_PASSWORD_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchResetPasswordPending: false,
        fetchResetPasswordError: null,
      };

    case ADMIN_FETCH_RESET_PASSWORD_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchResetPasswordPending: false,
        fetchResetPasswordError: action.data.error,
      };

    case ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchResetPasswordError: null,
      };

    default:
      return state;
  }
}
