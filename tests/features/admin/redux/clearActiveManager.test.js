import {
  ADMIN_CLEAR_ACTIVE_MANAGER,
} from '../../../../src/features/admin/redux/constants';

import {
  clearActiveManager,
  reducer,
} from '../../../../src/features/admin/redux/clearActiveManager';

describe('admin/redux/clearActiveManager', () => {
  it('returns correct action by clearActiveManager', () => {
    expect(clearActiveManager()).toHaveProperty('type', ADMIN_CLEAR_ACTIVE_MANAGER);
  });

  it('handles action type ADMIN_CLEAR_ACTIVE_MANAGER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADMIN_CLEAR_ACTIVE_MANAGER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
