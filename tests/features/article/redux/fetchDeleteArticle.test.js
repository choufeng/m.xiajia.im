import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ARTICLE_FETCH_DELETE_ARTICLE_BEGIN,
  ARTICLE_FETCH_DELETE_ARTICLE_SUCCESS,
  ARTICLE_FETCH_DELETE_ARTICLE_FAILURE,
  ARTICLE_FETCH_DELETE_ARTICLE_DISMISS_ERROR,
} from '../../../../src/features/article/redux/constants';

import {
  fetchDeleteArticle,
  dismissFetchDeleteArticleError,
  reducer,
} from '../../../../src/features/article/redux/fetchDeleteArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('article/redux/fetchDeleteArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchDeleteArticle succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchDeleteArticle())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ARTICLE_FETCH_DELETE_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ARTICLE_FETCH_DELETE_ARTICLE_SUCCESS);
      });
  });

  it('dispatches failure action when fetchDeleteArticle fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchDeleteArticle({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ARTICLE_FETCH_DELETE_ARTICLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ARTICLE_FETCH_DELETE_ARTICLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchDeleteArticleError', () => {
    const expectedAction = {
      type: ARTICLE_FETCH_DELETE_ARTICLE_DISMISS_ERROR,
    };
    expect(dismissFetchDeleteArticleError()).toEqual(expectedAction);
  });

  it('handles action type ARTICLE_FETCH_DELETE_ARTICLE_BEGIN correctly', () => {
    const prevState = { fetchDeleteArticlePending: false };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_DELETE_ARTICLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDeleteArticlePending).toBe(true);
  });

  it('handles action type ARTICLE_FETCH_DELETE_ARTICLE_SUCCESS correctly', () => {
    const prevState = { fetchDeleteArticlePending: true };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_DELETE_ARTICLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDeleteArticlePending).toBe(false);
  });

  it('handles action type ARTICLE_FETCH_DELETE_ARTICLE_FAILURE correctly', () => {
    const prevState = { fetchDeleteArticlePending: true };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_DELETE_ARTICLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDeleteArticlePending).toBe(false);
    expect(state.fetchDeleteArticleError).toEqual(expect.anything());
  });

  it('handles action type ARTICLE_FETCH_DELETE_ARTICLE_DISMISS_ERROR correctly', () => {
    const prevState = { fetchDeleteArticleError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ARTICLE_FETCH_DELETE_ARTICLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDeleteArticleError).toBe(null);
  });
});

