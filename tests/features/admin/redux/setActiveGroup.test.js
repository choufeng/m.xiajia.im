import {
  ADMIN_SET_ACTIVE_GROUP,
} from '../../../../src/features/admin/redux/constants';

import {
  setActiveGroup,
  reducer,
} from '../../../../src/features/admin/redux/setActiveGroup';

describe('admin/redux/setActiveGroup', () => {
  it('returns correct action by setActiveGroup', () => {
    expect(setActiveGroup()).toHaveProperty('type', ADMIN_SET_ACTIVE_GROUP);
  });

  it('handles action type ADMIN_SET_ACTIVE_GROUP correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADMIN_SET_ACTIVE_GROUP }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
