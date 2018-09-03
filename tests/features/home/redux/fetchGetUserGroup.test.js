import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_GET_USER_GROUP_BEGIN,
  HOME_FETCH_GET_USER_GROUP_SUCCESS,
  HOME_FETCH_GET_USER_GROUP_FAILURE,
  HOME_FETCH_GET_USER_GROUP_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchGetUserGroup,
  dismissFetchGetUserGroupError,
  reducer,
} from '../../../../src/features/home/redux/fetchGetUserGroup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchGetUserGroup', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetUserGroup succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetUserGroup())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_GET_USER_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_GET_USER_GROUP_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetUserGroup fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetUserGroup({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_GET_USER_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_GET_USER_GROUP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetUserGroupError', () => {
    const expectedAction = {
      type: HOME_FETCH_GET_USER_GROUP_DISMISS_ERROR,
    };
    expect(dismissFetchGetUserGroupError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_GET_USER_GROUP_BEGIN correctly', () => {
    const prevState = { fetchGetUserGroupPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_GROUP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserGroupPending).toBe(true);
  });

  it('handles action type HOME_FETCH_GET_USER_GROUP_SUCCESS correctly', () => {
    const prevState = { fetchGetUserGroupPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_GROUP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserGroupPending).toBe(false);
  });

  it('handles action type HOME_FETCH_GET_USER_GROUP_FAILURE correctly', () => {
    const prevState = { fetchGetUserGroupPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_GROUP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserGroupPending).toBe(false);
    expect(state.fetchGetUserGroupError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_GET_USER_GROUP_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetUserGroupError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_GROUP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserGroupError).toBe(null);
  });
});

