import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CATEGORY_FETCH_ADD_CATEGORY_BEGIN,
  CATEGORY_FETCH_ADD_CATEGORY_SUCCESS,
  CATEGORY_FETCH_ADD_CATEGORY_FAILURE,
  CATEGORY_FETCH_ADD_CATEGORY_DISMISS_ERROR,
} from '../../../../src/features/category/redux/constants';

import {
  fetchAddCategory,
  dismissFetchAddCategoryError,
  reducer,
} from '../../../../src/features/category/redux/fetchAddCategory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category/redux/fetchAddCategory', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchAddCategory succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchAddCategory())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_ADD_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_ADD_CATEGORY_SUCCESS);
      });
  });

  it('dispatches failure action when fetchAddCategory fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchAddCategory({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CATEGORY_FETCH_ADD_CATEGORY_BEGIN);
        expect(actions[1]).toHaveProperty('type', CATEGORY_FETCH_ADD_CATEGORY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchAddCategoryError', () => {
    const expectedAction = {
      type: CATEGORY_FETCH_ADD_CATEGORY_DISMISS_ERROR,
    };
    expect(dismissFetchAddCategoryError()).toEqual(expectedAction);
  });

  it('handles action type CATEGORY_FETCH_ADD_CATEGORY_BEGIN correctly', () => {
    const prevState = { fetchAddCategoryPending: false };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_ADD_CATEGORY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAddCategoryPending).toBe(true);
  });

  it('handles action type CATEGORY_FETCH_ADD_CATEGORY_SUCCESS correctly', () => {
    const prevState = { fetchAddCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_ADD_CATEGORY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAddCategoryPending).toBe(false);
  });

  it('handles action type CATEGORY_FETCH_ADD_CATEGORY_FAILURE correctly', () => {
    const prevState = { fetchAddCategoryPending: true };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_ADD_CATEGORY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAddCategoryPending).toBe(false);
    expect(state.fetchAddCategoryError).toEqual(expect.anything());
  });

  it('handles action type CATEGORY_FETCH_ADD_CATEGORY_DISMISS_ERROR correctly', () => {
    const prevState = { fetchAddCategoryError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CATEGORY_FETCH_ADD_CATEGORY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAddCategoryError).toBe(null);
  });
});

