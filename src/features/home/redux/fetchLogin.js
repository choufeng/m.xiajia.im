import {
  HOME_FETCH_LOGIN_BEGIN,
  HOME_FETCH_LOGIN_SUCCESS,
  HOME_FETCH_LOGIN_FAILURE,
  HOME_FETCH_LOGIN_DISMISS_ERROR,
} from './constants';
import api from '../../../common/api'

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchLogin(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_LOGIN_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = api.post(`auth`, args)
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_FETCH_LOGIN_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_LOGIN_FAILURE,
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
export function dismissFetchLoginError() {
  return {
    type: HOME_FETCH_LOGIN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_LOGIN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchLoginPending: true,
        fetchLoginError: null,
      };

    case HOME_FETCH_LOGIN_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchLoginPending: false,
        fetchLoginError: null,
        accessToken: action.data.token,
        userId: action.data.name,
        roleNodes: action.data.nodes,
      };

    case HOME_FETCH_LOGIN_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchLoginPending: false,
        fetchLoginError: action.data.error,
      };

    case HOME_FETCH_LOGIN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchLoginError: null,
      };

    default:
      return state;
  }
}
