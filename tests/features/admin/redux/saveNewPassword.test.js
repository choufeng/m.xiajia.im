import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_SAVE_NEW_PASSWORD_BEGIN,
  ADMIN_SAVE_NEW_PASSWORD_SUCCESS,
  ADMIN_SAVE_NEW_PASSWORD_FAILURE,
  ADMIN_SAVE_NEW_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  saveNewPassword,
  dismissSaveNewPasswordError,
  reducer,
} from '../../../../src/features/admin/redux/saveNewPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/saveNewPassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveNewPassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveNewPassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SAVE_NEW_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SAVE_NEW_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when saveNewPassword fails', () => {
    const store = mockStore({});

    return store.dispatch(saveNewPassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SAVE_NEW_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SAVE_NEW_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveNewPasswordError', () => {
    const expectedAction = {
      type: ADMIN_SAVE_NEW_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissSaveNewPasswordError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_SAVE_NEW_PASSWORD_BEGIN correctly', () => {
    const prevState = { saveNewPasswordPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewPasswordPending).toBe(true);
  });

  it('handles action type ADMIN_SAVE_NEW_PASSWORD_SUCCESS correctly', () => {
    const prevState = { saveNewPasswordPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewPasswordPending).toBe(false);
  });

  it('handles action type ADMIN_SAVE_NEW_PASSWORD_FAILURE correctly', () => {
    const prevState = { saveNewPasswordPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewPasswordPending).toBe(false);
    expect(state.saveNewPasswordError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_SAVE_NEW_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { saveNewPasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewPasswordError).toBe(null);
  });
});

