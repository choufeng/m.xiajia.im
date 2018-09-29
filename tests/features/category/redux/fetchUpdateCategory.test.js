import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_UPDATE_CATEGORY_BEGIN,
  CATEGORY_FETCH_UPDATE_CATEGORY_SUCCESS,
  CATEGORY_FETCH_UPDATE_CATEGORY_FAILURE,
  CATEGORY_FETCH_UPDATE_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchUpdateCategory,
  dismissFetchUpdateCategoryError,
  reducer,
} from '../../../../src/features/category/redux/fetchUpdateCategory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchUpdateCategory', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchUpdateCategory succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchUpdateCategory())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_UPDATE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_UPDATE_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when fetchUpdateCategory fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchUpdateCategory({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_UPDATE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_UPDATE_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchUpdateCategoryError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_UPDATE_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissFetchUpdateCategoryError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_UPDATE_CATEGORY_BEGIN correctly', () => {
    const prevState = { fetchUpdateCategoryPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_UPDATE_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUpdateCategoryPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_UPDATE_CATEGORY_SUCCESS correctly', () => {
    const prevState = { fetchUpdateCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_UPDATE_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUpdateCategoryPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_UPDATE_CATEGORY_FAILURE correctly', () => {
    const prevState = { fetchUpdateCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_UPDATE_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUpdateCategoryPending).toBe(false);
    expect(state.fetchUpdateCategoryError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_UPDATE_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { fetchUpdateCategoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_UPDATE_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchUpdateCategoryError).toBe(null);
  });
});

