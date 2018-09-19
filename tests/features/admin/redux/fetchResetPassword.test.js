import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_FETCH_RESET_PASSWORD_BEGIN,
  ADMIN_FETCH_RESET_PASSWORD_SUCCESS,
  ADMIN_FETCH_RESET_PASSWORD_FAILURE,
  ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  fetchResetPassword,
  dismissFetchResetPasswordError,
  reducer,
} from '../../../../src/features/admin/redux/fetchResetPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/fetchResetPassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchResetPassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchResetPassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_RESET_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_RESET_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when fetchResetPassword fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchResetPassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_RESET_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_RESET_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchResetPasswordError', () => {
    const expectedAction = {
      type: ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissFetchResetPasswordError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_FETCH_RESET_PASSWORD_BEGIN correctly', () => {
    const prevState = { fetchResetPasswordPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_RESET_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchResetPasswordPending).toBe(true);
  });

  it('handles action type ADMIN_FETCH_RESET_PASSWORD_SUCCESS correctly', () => {
    const prevState = { fetchResetPasswordPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_RESET_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchResetPasswordPending).toBe(false);
  });

  it('handles action type ADMIN_FETCH_RESET_PASSWORD_FAILURE correctly', () => {
    const prevState = { fetchResetPasswordPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_RESET_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchResetPasswordPending).toBe(false);
    expect(state.fetchResetPasswordError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { fetchResetPasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_RESET_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchResetPasswordError).toBe(null);
  });
});

