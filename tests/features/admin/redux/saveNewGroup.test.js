import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_SAVE_NEW_GROUP_BEGIN,
  ADMIN_SAVE_NEW_GROUP_SUCCESS,
  ADMIN_SAVE_NEW_GROUP_FAILURE,
  ADMIN_SAVE_NEW_GROUP_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  saveNewGroup,
  dismissSaveNewGroupError,
  reducer,
} from '../../../../src/features/admin/redux/saveNewGroup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/saveNewGroup', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveNewGroup succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveNewGroup())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SAVE_NEW_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SAVE_NEW_GROUP_SUCCESS);
      });
  });

  it('dispatches failure action when saveNewGroup fails', () => {
    const store = mockStore({});

    return store.dispatch(saveNewGroup({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SAVE_NEW_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SAVE_NEW_GROUP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveNewGroupError', () => {
    const expectedAction = {
      type: ADMIN_SAVE_NEW_GROUP_DISMISS_ERROR,
    };
    expect(dismissSaveNewGroupError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_SAVE_NEW_GROUP_BEGIN correctly', () => {
    const prevState = { saveNewGroupPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_GROUP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewGroupPending).toBe(true);
  });

  it('handles action type ADMIN_SAVE_NEW_GROUP_SUCCESS correctly', () => {
    const prevState = { saveNewGroupPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_GROUP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewGroupPending).toBe(false);
  });

  it('handles action type ADMIN_SAVE_NEW_GROUP_FAILURE correctly', () => {
    const prevState = { saveNewGroupPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_GROUP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewGroupPending).toBe(false);
    expect(state.saveNewGroupError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_SAVE_NEW_GROUP_DISMISS_ERROR correctly', () => {
    const prevState = { saveNewGroupError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_SAVE_NEW_GROUP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveNewGroupError).toBe(null);
  });
});

