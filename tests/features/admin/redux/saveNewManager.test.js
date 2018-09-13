import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_SAVE_NEW_MANAGER_BEGIN,
  ADMIN_SAVE_NEW_MANAGER_SUCCESS,
  ADMIN_SAVE_NEW_MANAGER_FAILURE,
  ADMIN_SAVE_NEW_MANAGER_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  saveNewManager,
  dismissSaveNewManagerError,
  reducer,
} from '../../../../src/features/admin/redux/saveNewManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/saveNewManager', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveNewManager succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveNewManager())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SAVE_NEW_MANAGER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SAVE_NEW_MANAGER_SUCCESS);
      });
  });

  it('dispatches failure action when saveNewManager fails', () => {
    const store = mockStore({});

    return store.dispatch(saveNewManager({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SAVE_NEW_MANAGER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SAVE_NEW_MANAGER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveNewManagerError', () => {
    const expectedAction = {
      type: ADMIN_SAVE_NEW_MANAGER_DISMISS_ERROR,
    };
    expect(dismissSaveNewManagerError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_SAVE_NEW_MANAGER_BEGIN correctly', () => {
    const prevState = { saveNewManagerPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_MANAGER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewManagerPending).toBe(true);
  });

  it('handles action type ADMIN_SAVE_NEW_MANAGER_SUCCESS correctly', () => {
    const prevState = { saveNewManagerPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_MANAGER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewManagerPending).toBe(false);
  });

  it('handles action type ADMIN_SAVE_NEW_MANAGER_FAILURE correctly', () => {
    const prevState = { saveNewManagerPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_MANAGER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewManagerPending).toBe(false);
    expect(state.saveNewManagerError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_SAVE_NEW_MANAGER_DISMISS_ERROR correctly', () => {
    const prevState = { saveNewManagerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_MANAGER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewManagerError).toBe(null);
  });
});

