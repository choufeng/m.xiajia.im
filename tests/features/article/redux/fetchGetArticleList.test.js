import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ARTICLE_FETCH_GET_ARTICLE_LIST_BEGIN,
  ARTICLE_FETCH_GET_ARTICLE_LIST_SUCCESS,
  ARTICLE_FETCH_GET_ARTICLE_LIST_FAILURE,
  ARTICLE_FETCH_GET_ARTICLE_LIST_DISMISS_ERROR,
} from '../../../../src/features/article/redux/constants';

import {
  fetchGetArticleList,
  dismissFetchGetArticleListError,
  reducer,
} from '../../../../src/features/article/redux/fetchGetArticleList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('article/redux/fetchGetArticleList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetArticleList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetArticleList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetArticleList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetArticleList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ARTICLE_FETCH_GET_ARTICLE_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetArticleListError', () => {
    const expectedAction = {
      type: ARTICLE_FETCH_GET_ARTICLE_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchGetArticleListError()).toEqual(expectedAction);
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_LIST_BEGIN correctly', () => {
    const prevState = { fetchGetArticleListPending: false };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleListPending).toBe(true);
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_LIST_SUCCESS correctly', () => {
    const prevState = { fetchGetArticleListPending: true };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleListPending).toBe(false);
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_LIST_FAILURE correctly', () => {
    const prevState = { fetchGetArticleListPending: true };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleListPending).toBe(false);
    expect(state.fetchGetArticleListError).toEqual(expect.anything());
  });

  it('handles action type ARTICLE_FETCH_GET_ARTICLE_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetArticleListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_GET_ARTICLE_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetArticleListError).toBe(null);
  });
});

