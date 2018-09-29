import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_REMOVE_CATEGORY_BEGIN,
  CATEGORY_FETCH_REMOVE_CATEGORY_SUCCESS,
  CATEGORY_FETCH_REMOVE_CATEGORY_FAILURE,
  CATEGORY_FETCH_REMOVE_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchRemoveCategory,
  dismissFetchRemoveCategoryError,
  reducer,
} from '../../../../src/features/category/redux/fetchRemoveCategory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchRemoveCategory', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchRemoveCategory succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchRemoveCategory())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_REMOVE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_REMOVE_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when fetchRemoveCategory fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchRemoveCategory({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_REMOVE_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_REMOVE_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchRemoveCategoryError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_REMOVE_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissFetchRemoveCategoryError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_REMOVE_CATEGORY_BEGIN correctly', () => {
    const prevState = { fetchRemoveCategoryPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_REMOVE_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRemoveCategoryPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_REMOVE_CATEGORY_SUCCESS correctly', () => {
    const prevState = { fetchRemoveCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_REMOVE_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRemoveCategoryPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_REMOVE_CATEGORY_FAILURE correctly', () => {
    const prevState = { fetchRemoveCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_REMOVE_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRemoveCategoryPending).toBe(false);
    expect(state.fetchRemoveCategoryError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_REMOVE_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { fetchRemoveCategoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_REMOVE_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRemoveCategoryError).toBe(null);
  });
});

