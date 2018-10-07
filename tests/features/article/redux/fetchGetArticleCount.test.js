import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN,
  ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS,
  ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE,
  ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR,
} from '../../../../src/features/article/redux/constants';

import {
  fetchGetArticleCount,
  dismissFetchGetArticleCountError,
  reducer,
} from '../../../../src/features/article/redux/fetchGetArticleCount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('article/redux/fetchGetArticleCount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetArticleCount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetArticleCount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN);
        expect(actions[1]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetArticleCount fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetArticleCount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN);
        expect(actions[1]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetArticleCountError', () => {
    const expectedAction = {
      type: ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR,
    };
    expect(dismissFetchGetArticleCountError()).toEqual(expectedAction);
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN correctly', () => {
    const prevState = { fetchGetArticleCountPending: false };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_COUNT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleCountPending).toBe(true);
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS correctly', () => {
    const prevState = { fetchGetArticleCountPending: true };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_COUNT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleCountPending).toBe(false);
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE correctly', () => {
    const prevState = { fetchGetArticleCountPending: true };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_COUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleCountPending).toBe(false);
    expect(state.fetchGetArticleCountError).toEqual(expect.anything());
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetArticleCountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_COUNT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleCountError).toBe(null);
  });
});

