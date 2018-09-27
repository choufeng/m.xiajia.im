import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_BEGIN,
  CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_SUCCESS,
  CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_FAILURE,
  CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchGetCategoryListBySelectedRootId,
  dismissFetchGetCategoryListBySelectedRootIdError,
  reducer,
} from '../../../../src/features/category/redux/fetchGetCategoryListBySelectedRootId';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchGetCategoryListBySelectedRootId', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetCategoryListBySelectedRootId succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetCategoryListBySelectedRootId())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetCategoryListBySelectedRootId fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetCategoryListBySelectedRootId({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetCategoryListBySelectedRootIdError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_DISMISS_ERROR,
    };
    expect(dismissFetchGetCategoryListBySelectedRootIdError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_BEGIN correctly', () => {
    const prevState = { fetchGetCatetoryListBySelectedRootIdPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetCatetoryListBySelectedRootIdPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_SUCCESS correctly', () => {
    const prevState = { fetchGetCatetoryListBySelectedRootIdPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetCatetoryListBySelectedRootIdPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_FAILURE correctly', () => {
    const prevState = { fetchGetCatetoryListBySelectedRootIdPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetCatetoryListBySelectedRootIdPending).toBe(false);
    expect(state.fetchGetCatetoryListBySelectedRootIdError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetCatetoryListBySelectedRootIdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_CATEGORY_LIST_BY_SELECTED_ROOT_ID_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetCatetoryListBySelectedRootIdError).toBe(null);
  });
});

