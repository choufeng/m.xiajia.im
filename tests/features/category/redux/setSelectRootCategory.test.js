import {
  CATEGORY_SET_SELECT_ROOT_CATEGORY,
} from '../../../../src/features/category/redux/constants';

import {
  setSelectRootCategory,
  reducer,
} from '../../../../src/features/category/redux/setSelectRootCategory';

describe('category/redux/setSelectRootCategory', () => {
  it('returns correct action by setSelectRootCategory', () => {
    expect(setSelectRootCategory()).toHaveProperty('type', CATEGORY_SET_SELECT_ROOT_CATEGORY);
  });

  it('handles action type CATEGORY_SET_SELECT_ROOT_CATEGORY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CATEGORY_SET_SELECT_ROOT_CATEGORY }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
