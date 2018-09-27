import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchGetActiveCategoryParent,
  dismissFetchGetActiveCategoryParentError,
  reducer,
} from '../../../../src/features/category/redux/fetchGetActiveCategoryParent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchGetActiveCategoryParent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetActiveCategoryParent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetActiveCategoryParent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetActiveCategoryParent fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetActiveCategoryParent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetActiveCategoryParentError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR,
    };
    expect(dismissFetchGetActiveCategoryParentError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN correctly', () => {
    const prevState = { fetchGetActiveCategoryParentPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCategoryParentPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS correctly', () => {
    const prevState = { fetchGetActiveCategoryParentPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCategoryParentPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE correctly', () => {
    const prevState = { fetchGetActiveCategoryParentPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCategoryParentPending).toBe(false);
    expect(state.fetchGetActiveCategoryParentError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetActiveCategoryParentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_PARENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCategoryParentError).toBe(null);
  });
});

