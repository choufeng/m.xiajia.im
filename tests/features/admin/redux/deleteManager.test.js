import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_DELETE_MANAGER_BEGIN,
  ADMIN_DELETE_MANAGER_SUCCESS,
  ADMIN_DELETE_MANAGER_FAILURE,
  ADMIN_DELETE_MANAGER_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  deleteManager,
  dismissDeleteManagerError,
  reducer,
} from '../../../../src/features/admin/redux/deleteManager';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/deleteManager', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteManager succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteManager())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_DELETE_MANAGER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_DELETE_MANAGER_SUCCESS);
      });
  });

  it('dispatches failure action when deleteManager fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteManager({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_DELETE_MANAGER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_DELETE_MANAGER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteManagerError', () => {
    const expectedAction = {
      type: ADMIN_DELETE_MANAGER_DISMISS_ERROR,
    };
    expect(dismissDeleteManagerError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_DELETE_MANAGER_BEGIN correctly', () => {
    const prevState = { deleteManagerPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_DELETE_MANAGER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteManagerPending).toBe(true);
  });

  it('handles action type ADMIN_DELETE_MANAGER_SUCCESS correctly', () => {
    const prevState = { deleteManagerPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_DELETE_MANAGER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteManagerPending).toBe(false);
  });

  it('handles action type ADMIN_DELETE_MANAGER_FAILURE correctly', () => {
    const prevState = { deleteManagerPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_DELETE_MANAGER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteManagerPending).toBe(false);
    expect(state.deleteManagerError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_DELETE_MANAGER_DISMISS_ERROR correctly', () => {
    const prevState = { deleteManagerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_DELETE_MANAGER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteManagerError).toBe(null);
  });
});

