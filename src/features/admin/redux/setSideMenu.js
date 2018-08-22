import axios from 'axios'
import {
  ADMIN_SET_SIDE_MENU_BEGIN,
  ADMIN_SET_SIDE_MENU_SUCCESS,
  ADMIN_SET_SIDE_MENU_FAILURE,
  ADMIN_SET_SIDE_MENU_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function setSideMenu(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ADMIN_SET_SIDE_MENU_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('http://ide.xiajia.im:3000/api/menus')
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: ADMIN_SET_SIDE_MENU_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: ADMIN_SET_SIDE_MENU_FAILURE,
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
export function dismissSetSideMenuError() {
  return {
    type: ADMIN_SET_SIDE_MENU_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_SET_SIDE_MENU_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        setSideMenuPending: true,
        setSideMenuError: null,
      };

    case ADMIN_SET_SIDE_MENU_SUCCESS:
      // The request is success
      return {
        ...state,
        setSideMenuPending: false,
        setSideMenuError: null,
        sideMenu: action.data.data
      };

    case ADMIN_SET_SIDE_MENU_FAILURE:
      // The request is failed
      return {
        ...state,
        setSideMenuPending: false,
        setSideMenuError: action.data.error,
      };

    case ADMIN_SET_SIDE_MENU_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        setSideMenuError: null,
      };

    default:
      return state;
  }
}
