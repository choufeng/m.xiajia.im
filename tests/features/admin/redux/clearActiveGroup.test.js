import {
  ADMIN_CLEAR_ACTIVE_GROUP,
} from '../../../../src/features/admin/redux/constants';

import {
  clearActiveGroup,
  reducer,
} from '../../../../src/features/admin/redux/clearActiveGroup';

describe('admin/redux/clearActiveGroup', () => {
  it('returns correct action by clearActiveGroup', () => {
    expect(clearActiveGroup()).toHaveProperty('type', ADMIN_CLEAR_ACTIVE_GROUP);
  });

  it('handles action type ADMIN_CLEAR_ACTIVE_GROUP correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADMIN_CLEAR_ACTIVE_GROUP }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
