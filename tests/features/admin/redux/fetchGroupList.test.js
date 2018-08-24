import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_FETCH_GROUP_LIST_BEGIN,
  ADMIN_FETCH_GROUP_LIST_SUCCESS,
  ADMIN_FETCH_GROUP_LIST_FAILURE,
  ADMIN_FETCH_GROUP_LIST_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  fetchGroupList,
  dismissFetchGroupListError,
  reducer,
} from '../../../../src/features/admin/redux/fetchGroupList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/fetchGroupList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGroupList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGroupList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_GROUP_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_GROUP_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGroupList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGroupList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_GROUP_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_GROUP_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGroupListError', () => {
    const expectedAction = {
      type: ADMIN_FETCH_GROUP_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchGroupListError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_FETCH_GROUP_LIST_BEGIN correctly', () => {
    const prevState = { fetchGroupListPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_GROUP_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGroupListPending).toBe(true);
  });

  it('handles action type ADMIN_FETCH_GROUP_LIST_SUCCESS correctly', () => {
    const prevState = { fetchGroupListPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_GROUP_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGroupListPending).toBe(false);
  });

  it('handles action type ADMIN_FETCH_GROUP_LIST_FAILURE correctly', () => {
    const prevState = { fetchGroupListPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_GROUP_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGroupListPending).toBe(false);
    expect(state.fetchGroupListError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_FETCH_GROUP_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGroupListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_GROUP_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGroupListError).toBe(null);
  });
});

