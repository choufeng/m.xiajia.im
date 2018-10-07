import {
  ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN,
  ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS,
  ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE,
  ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR,
} from './constants';
import api from '../../../common/api';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchGetArticleCount(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = api.get(`article/count`)
      doRequest.then(
        (res) => {
          dispatch({
            type: ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE,
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
export function dismissFetchGetArticleCountError() {
  return {
    type: ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchGetArticleCountPending: true,
        fetchGetArticleCountError: null,
      };

    case ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchGetArticleCountPending: false,
        fetchGetArticleCountError: null,
        articleCount: action.data
      };

    case ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchGetArticleCountPending: false,
        fetchGetArticleCountError: action.data.error,
      };

    case ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchGetArticleCountError: null,
      };

    default:
      return state;
  }
}
