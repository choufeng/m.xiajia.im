import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_BEGIN,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_SUCCESS,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_FAILURE,
  CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchGetActiveCategoryChildren,
  dismissFetchGetActiveCategoryChildrenError,
  reducer,
} from '../../../../src/features/category/redux/fetchGetActiveCategoryChildren';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchGetActiveCategoryChildren', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetActiveCategoryChildren succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetActiveCategoryChildren())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetActiveCategoryChildren fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetActiveCategoryChildren({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetActiveCategoryChildrenError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_DISMISS_ERROR,
    };
    expect(dismissFetchGetActiveCategoryChildrenError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_BEGIN correctly', () => {
    const prevState = { fetchGetActiveCatetoryChildrenPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCatetoryChildrenPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_SUCCESS correctly', () => {
    const prevState = { fetchGetActiveCatetoryChildrenPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCatetoryChildrenPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_FAILURE correctly', () => {
    const prevState = { fetchGetActiveCatetoryChildrenPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCatetoryChildrenPending).toBe(false);
    expect(state.fetchGetActiveCatetoryChildrenError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetActiveCatetoryChildrenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_GET_ACTIVE_CATEGORY_CHILDREN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetActiveCatetoryChildrenError).toBe(null);
  });
});

