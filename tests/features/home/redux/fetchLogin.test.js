import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_LOGIN_BEGIN,
  HOME_FETCH_LOGIN_SUCCESS,
  HOME_FETCH_LOGIN_FAILURE,
  HOME_FETCH_LOGIN_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchLogin,
  dismissFetchLoginError,
  reducer,
} from '../../../../src/features/home/redux/fetchLogin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchLogin', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchLogin succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchLogin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_LOGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_LOGIN_SUCCESS);
      });
  });

  it('dispatches failure action when fetchLogin fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchLogin({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_LOGIN_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_LOGIN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchLoginError', () => {
    const expectedAction = {
      type: HOME_FETCH_LOGIN_DISMISS_ERROR,
    };
    expect(dismissFetchLoginError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_LOGIN_BEGIN correctly', () => {
    const prevState = { fetchLoginPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_LOGIN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchLoginPending).toBe(true);
  });

  it('handles action type HOME_FETCH_LOGIN_SUCCESS correctly', () => {
    const prevState = { fetchLoginPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_LOGIN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchLoginPending).toBe(false);
  });

  it('handles action type HOME_FETCH_LOGIN_FAILURE correctly', () => {
    const prevState = { fetchLoginPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_LOGIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchLoginPending).toBe(false);
    expect(state.fetchLoginError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_LOGIN_DISMISS_ERROR correctly', () => {
    const prevState = { fetchLoginError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_LOGIN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchLoginError).toBe(null);
  });
});

