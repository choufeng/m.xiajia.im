import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_UPDATE_GROUP_BEGIN,
  ADMIN_UPDATE_GROUP_SUCCESS,
  ADMIN_UPDATE_GROUP_FAILURE,
  ADMIN_UPDATE_GROUP_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  updateGroup,
  dismissUpdateGroupError,
  reducer,
} from '../../../../src/features/admin/redux/updateGroup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/updateGroup', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateGroup succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateGroup())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_UPDATE_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_UPDATE_GROUP_SUCCESS);
      });
  });

  it('dispatches failure action when updateGroup fails', () => {
    const store = mockStore({});

    return store.dispatch(updateGroup({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_UPDATE_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_UPDATE_GROUP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateGroupError', () => {
    const expectedAction = {
      type: ADMIN_UPDATE_GROUP_DISMISS_ERROR,
    };
    expect(dismissUpdateGroupError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_UPDATE_GROUP_BEGIN correctly', () => {
    const prevState = { saveGroupNodesPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_UPDATE_GROUP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGroupNodesPending).toBe(true);
  });

  it('handles action type ADMIN_UPDATE_GROUP_SUCCESS correctly', () => {
    const prevState = { saveGroupNodesPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_UPDATE_GROUP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGroupNodesPending).toBe(false);
  });

  it('handles action type ADMIN_UPDATE_GROUP_FAILURE correctly', () => {
    const prevState = { saveGroupNodesPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_UPDATE_GROUP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGroupNodesPending).toBe(false);
    expect(state.saveGroupNodesError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_UPDATE_GROUP_DISMISS_ERROR correctly', () => {
    const prevState = { saveGroupNodesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_UPDATE_GROUP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGroupNodesError).toBe(null);
  });
});

