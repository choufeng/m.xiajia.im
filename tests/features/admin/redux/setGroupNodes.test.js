import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_SET_GROUP_NODES_BEGIN,
  ADMIN_SET_GROUP_NODES_SUCCESS,
  ADMIN_SET_GROUP_NODES_FAILURE,
  ADMIN_SET_GROUP_NODES_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  setGroupNodes,
  dismissSetGroupNodesError,
  reducer,
} from '../../../../src/features/admin/redux/setGroupNodes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/setGroupNodes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when setGroupNodes succeeds', () => {
    const store = mockStore({});

    return store.dispatch(setGroupNodes())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SET_GROUP_NODES_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SET_GROUP_NODES_SUCCESS);
      });
  });

  it('dispatches failure action when setGroupNodes fails', () => {
    const store = mockStore({});

    return store.dispatch(setGroupNodes({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SET_GROUP_NODES_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SET_GROUP_NODES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSetGroupNodesError', () => {
    const expectedAction = {
      type: ADMIN_SET_GROUP_NODES_DISMISS_ERROR,
    };
    expect(dismissSetGroupNodesError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_SET_GROUP_NODES_BEGIN correctly', () => {
    const prevState = { setGroupNodesPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_GROUP_NODES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setGroupNodesPending).toBe(true);
  });

  it('handles action type ADMIN_SET_GROUP_NODES_SUCCESS correctly', () => {
    const prevState = { setGroupNodesPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_GROUP_NODES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setGroupNodesPending).toBe(false);
  });

  it('handles action type ADMIN_SET_GROUP_NODES_FAILURE correctly', () => {
    const prevState = { setGroupNodesPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_GROUP_NODES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setGroupNodesPending).toBe(false);
    expect(state.setGroupNodesError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_SET_GROUP_NODES_DISMISS_ERROR correctly', () => {
    const prevState = { setGroupNodesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_GROUP_NODES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setGroupNodesError).toBe(null);
  });
});

