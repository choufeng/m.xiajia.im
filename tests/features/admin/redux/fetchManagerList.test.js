import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_FETCH_MANAGER_LIST_BEGIN,
  ADMIN_FETCH_MANAGER_LIST_SUCCESS,
  ADMIN_FETCH_MANAGER_LIST_FAILURE,
  ADMIN_FETCH_MANAGER_LIST_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  fetchManagerList,
  dismissFetchManagerListError,
  reducer,
} from '../../../../src/features/admin/redux/fetchManagerList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/fetchManagerList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchManagerList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchManagerList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_MANAGER_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_MANAGER_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchManagerList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchManagerList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_MANAGER_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_MANAGER_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchManagerListError', () => {
    const expectedAction = {
      type: ADMIN_FETCH_MANAGER_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchManagerListError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_FETCH_MANAGER_LIST_BEGIN correctly', () => {
    const prevState = { fetchManagerListPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_MANAGER_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchManagerListPending).toBe(true);
  });

  it('handles action type ADMIN_FETCH_MANAGER_LIST_SUCCESS correctly', () => {
    const prevState = { fetchManagerListPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_MANAGER_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchManagerListPending).toBe(false);
  });

  it('handles action type ADMIN_FETCH_MANAGER_LIST_FAILURE correctly', () => {
    const prevState = { fetchManagerListPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_MANAGER_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchManagerListPending).toBe(false);
    expect(state.fetchManagerListError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_FETCH_MANAGER_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchManagerListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_MANAGER_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchManagerListError).toBe(null);
  });
});

