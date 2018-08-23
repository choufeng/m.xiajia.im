import {
  ADMIN_SET_SIDE_SELECTED,
} from '../../../../src/features/admin/redux/constants';

import {
  setSideSelected,
  reducer,
} from '../../../../src/features/admin/redux/setSideSelected';

describe('admin/redux/setSideSelected', () => {
  it('returns correct action by setSideSelected', () => {
    expect(setSideSelected()).toHaveProperty('type', ADMIN_SET_SIDE_SELECTED);
  });

  it('handles action type ADMIN_SET_SIDE_SELECTED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADMIN_SET_SIDE_SELECTED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
