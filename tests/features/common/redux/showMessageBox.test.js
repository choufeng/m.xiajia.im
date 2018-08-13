import {
  COMMON_SHOW_MESSAGE_BOX,
} from '../../../../src/features/common/redux/constants';

import {
  showMessageBox,
  reducer,
} from '../../../../src/features/common/redux/showMessageBox';

describe('common/redux/showMessageBox', () => {
  it('returns correct action by showMessageBox', () => {
    expect(showMessageBox()).toHaveProperty('type', COMMON_SHOW_MESSAGE_BOX);
  });

  it('handles action type COMMON_SHOW_MESSAGE_BOX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SHOW_MESSAGE_BOX }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
