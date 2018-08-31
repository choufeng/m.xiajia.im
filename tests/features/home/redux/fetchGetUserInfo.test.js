import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_GET_USER_INFO_BEGIN,
  HOME_FETCH_GET_USER_INFO_SUCCESS,
  HOME_FETCH_GET_USER_INFO_FAILURE,
  HOME_FETCH_GET_USER_INFO_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchGetUserInfo,
  dismissFetchGetUserInfoError,
  reducer,
} from '../../../../src/features/home/redux/fetchGetUserInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchGetUserInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGetUserInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetUserInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_GET_USER_INFO_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_GET_USER_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGetUserInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGetUserInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_GET_USER_INFO_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_GET_USER_INFO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGetUserInfoError', () => {
    const expectedAction = {
      type: HOME_FETCH_GET_USER_INFO_DISMISS_ERROR,
    };
    expect(dismissFetchGetUserInfoError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_GET_USER_INFO_BEGIN correctly', () => {
    const prevState = { fetchGetUserInfoPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_INFO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserInfoPending).toBe(true);
  });

  it('handles action type HOME_FETCH_GET_USER_INFO_SUCCESS correctly', () => {
    const prevState = { fetchGetUserInfoPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_INFO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserInfoPending).toBe(false);
  });

  it('handles action type HOME_FETCH_GET_USER_INFO_FAILURE correctly', () => {
    const prevState = { fetchGetUserInfoPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserInfoPending).toBe(false);
    expect(state.fetchGetUserInfoError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_GET_USER_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGetUserInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_GET_USER_INFO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGetUserInfoError).toBe(null);
  });
});

