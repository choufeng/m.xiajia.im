import {
  ADMIN_SET_ACTIVE_MANAGER,
} from '../../../../src/features/admin/redux/constants';

import {
  setActiveManager,
  reducer,
} from '../../../../src/features/admin/redux/setActiveManager';

describe('admin/redux/setActiveManager', () => {
  it('returns correct action by setActiveManager', () => {
    expect(setActiveManager()).toHaveProperty('type', ADMIN_SET_ACTIVE_MANAGER);
  });

  it('handles action type ADMIN_SET_ACTIVE_MANAGER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADMIN_SET_ACTIVE_MANAGER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
