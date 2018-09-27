import {
  CATEGORY_SET_ACTIVE_CATEGORY,
} from '../../../../src/features/category/redux/constants';

import {
  setActiveCategory,
  reducer,
} from '../../../../src/features/category/redux/setActiveCategory';

describe('category/redux/setActiveCategory', () => {
  it('returns correct action by setActiveCategory', () => {
    expect(setActiveCategory()).toHaveProperty('type', CATEGORY_SET_ACTIVE_CATEGORY);
  });

  it('handles action type CATEGORY_SET_ACTIVE_CATEGORY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CATEGORY_SET_ACTIVE_CATEGORY }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
