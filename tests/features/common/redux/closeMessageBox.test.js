import {
  COMMON_CLOSE_MESSAGE_BOX,
} from '../../../../src/features/common/redux/constants';

import {
  closeMessageBox,
  reducer,
} from '../../../../src/features/common/redux/closeMessageBox';

describe('common/redux/closeMessageBox', () => {
  it('returns correct action by closeMessageBox', () => {
    expect(closeMessageBox()).toHaveProperty('type', COMMON_CLOSE_MESSAGE_BOX);
  });

  it('handles action type COMMON_CLOSE_MESSAGE_BOX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CLOSE_MESSAGE_BOX }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
