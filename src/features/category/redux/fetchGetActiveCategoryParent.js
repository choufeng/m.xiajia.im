import {
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR,
} from './constants';
import api from '../../../common/api';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchGetActiveCategoryParent(id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = api.get(`category/${id}/parent`)
      doRequest.then(
        (res) => {
          dispatch({
            type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE,
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
export function dismissFetchGetActiveCategoryParentError() {
  return {
    type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchGetActiveCategoryParentPending: true,
        fetchGetActiveCategoryParentError: null,
      };

    case CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchGetActiveCategoryParentPending: false,
        fetchGetActiveCategoryParentError: null,
        activeCategoryParent: action.data,
      };

    case CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchGetActiveCategoryParentPending: false,
        fetchGetActiveCategoryParentError: action.data.error,
      };

    case CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchGetActiveCategoryParentError: null,
      };

    default:
      return state;
  }
}
