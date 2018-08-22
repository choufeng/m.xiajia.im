import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_SET_SIDE_MENU_BEGIN,
  ADMIN_SET_SIDE_MENU_SUCCESS,
  ADMIN_SET_SIDE_MENU_FAILURE,
  ADMIN_SET_SIDE_MENU_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  setSideMenu,
  dismissSetSideMenuError,
  reducer,
} from '../../../../src/features/admin/redux/setSideMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/setSideMenu', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when setSideMenu succeeds', () => {
    const store = mockStore({});

    return store.dispatch(setSideMenu())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SET_SIDE_MENU_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SET_SIDE_MENU_SUCCESS);
      });
  });

  it('dispatches failure action when setSideMenu fails', () => {
    const store = mockStore({});

    return store.dispatch(setSideMenu({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_SET_SIDE_MENU_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_SET_SIDE_MENU_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSetSideMenuError', () => {
    const expectedAction = {
      type: ADMIN_SET_SIDE_MENU_DISMISS_ERROR,
    };
    expect(dismissSetSideMenuError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_SET_SIDE_MENU_BEGIN correctly', () => {
    const prevState = { setSideMenuPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_SIDE_MENU_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setSideMenuPending).toBe(true);
  });

  it('handles action type ADMIN_SET_SIDE_MENU_SUCCESS correctly', () => {
    const prevState = { setSideMenuPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_SIDE_MENU_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setSideMenuPending).toBe(false);
  });

  it('handles action type ADMIN_SET_SIDE_MENU_FAILURE correctly', () => {
    const prevState = { setSideMenuPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_SIDE_MENU_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setSideMenuPending).toBe(false);
    expect(state.setSideMenuError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_SET_SIDE_MENU_DISMISS_ERROR correctly', () => {
    const prevState = { setSideMenuError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_SET_SIDE_MENU_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.setSideMenuError).toBe(null);
  });
});

