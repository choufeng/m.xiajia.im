import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_BEGIN,
  CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_SUCCESS,
  CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_FAILURE,
  CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchGetRemoveRootCategory,
  dismissFetchGetRemoveRootCategoryError,
  reducer,
} from '../../../../src/features/category/redux/fetchGetRemoveRootCategory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchGetRemoveRootCategory', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetRemoveRootCategory succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetRemoveRootCategory())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetRemoveRootCategory fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetRemoveRootCategory({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetRemoveRootCategoryError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissFetchGetRemoveRootCategoryError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_BEGIN correctly', () => {
    const prevState = { fetchGetRemoveRootCategoryPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRemoveRootCategoryPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_SUCCESS correctly', () => {
    const prevState = { fetchGetRemoveRootCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRemoveRootCategoryPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_FAILURE correctly', () => {
    const prevState = { fetchGetRemoveRootCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRemoveRootCategoryPending).toBe(false);
    expect(state.fetchGetRemoveRootCategoryError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetRemoveRootCategoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_REMOVE_ROOT_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRemoveRootCategoryError).toBe(null);
  });
});

