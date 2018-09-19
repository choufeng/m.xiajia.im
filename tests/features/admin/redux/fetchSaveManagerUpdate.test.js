import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_FETCH_SAVE_MANAGER_UPDATE_BEGIN,
  ADMIN_FETCH_SAVE_MANAGER_UPDATE_SUCCESS,
  ADMIN_FETCH_SAVE_MANAGER_UPDATE_FAILURE,
  ADMIN_FETCH_SAVE_MANAGER_UPDATE_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  fetchSaveManagerUpdate,
  dismissFetchSaveManagerUpdateError,
  reducer,
} from '../../../../src/features/admin/redux/fetchSaveManagerUpdate';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/fetchSaveManagerUpdate', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchSaveManagerUpdate succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchSaveManagerUpdate())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_SAVE_MANAGER_UPDATE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_SAVE_MANAGER_UPDATE_SUCCESS);
      });
  });

  it('dispatches failure action when fetchSaveManagerUpdate fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchSaveManagerUpdate({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_FETCH_SAVE_MANAGER_UPDATE_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_FETCH_SAVE_MANAGER_UPDATE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchSaveManagerUpdateError', () => {
    const expectedAction = {
      type: ADMIN_FETCH_SAVE_MANAGER_UPDATE_DISMISS_ERROR,
    };
    expect(dismissFetchSaveManagerUpdateError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_FETCH_SAVE_MANAGER_UPDATE_BEGIN correctly', () => {
    const prevState = { fetchSaveManagerUpdatePending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_SAVE_MANAGER_UPDATE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchSaveManagerUpdatePending).toBe(true);
  });

  it('handles action type ADMIN_FETCH_SAVE_MANAGER_UPDATE_SUCCESS correctly', () => {
    const prevState = { fetchSaveManagerUpdatePending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_SAVE_MANAGER_UPDATE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchSaveManagerUpdatePending).toBe(false);
  });

  it('handles action type ADMIN_FETCH_SAVE_MANAGER_UPDATE_FAILURE correctly', () => {
    const prevState = { fetchSaveManagerUpdatePending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_SAVE_MANAGER_UPDATE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchSaveManagerUpdatePending).toBe(false);
    expect(state.fetchSaveManagerUpdateError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_FETCH_SAVE_MANAGER_UPDATE_DISMISS_ERROR correctly', () => {
    const prevState = { fetchSaveManagerUpdateError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_FETCH_SAVE_MANAGER_UPDATE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchSaveManagerUpdateError).toBe(null);
  });
});

