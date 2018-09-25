import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_BEGIN,
  CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_SUCCESS,
  CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_FAILURE,
  CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchGetRootCategoryList,
  dismissFetchGetRootCategoryListError,
  reducer,
} from '../../../../src/features/category/redux/fetchGetRootCategoryList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchGetRootCategoryList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetRootCategoryList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetRootCategoryList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetRootCategoryList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetRootCategoryList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetRootCategoryListError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchGetRootCategoryListError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_BEGIN correctly', () => {
    const prevState = { fetchGetRootCategoryListPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRootCategoryListPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_SUCCESS correctly', () => {
    const prevState = { fetchGetRootCategoryListPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRootCategoryListPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_FAILURE correctly', () => {
    const prevState = { fetchGetRootCategoryListPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRootCategoryListPending).toBe(false);
    expect(state.fetchGetRootCategoryListError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetRootCategoryListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ROOT_CATEGORY_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetRootCategoryListError).toBe(null);
  });
});

