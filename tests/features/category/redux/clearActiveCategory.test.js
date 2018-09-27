import {
  CATEGORY_CLEAR_ACTIVE_CATEGORY,
} from '../../../../src/features/category/redux/constants';

import {
  clearActiveCategory,
  reducer,
} from '../../../../src/features/category/redux/clearActiveCategory';

describe('category/redux/clearActiveCategory', () => {
  it('returns correct action by clearActiveCategory', () => {
    expect(clearActiveCategory()).toHaveProperty('type', CATEGORY_CLEAR_ACTIVE_CATEGORY);
  });

  it('handles action type CATEGORY_CLEAR_ACTIVE_CATEGORY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CATEGORY_CLEAR_ACTIVE_CATEGORY }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
