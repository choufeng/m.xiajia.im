import {
  COMMON_OPEN_MESSAGE_BOX,
} from '../../../../src/features/common/redux/constants';

import {
  openMessageBox,
  reducer,
} from '../../../../src/features/common/redux/openMessageBox';

describe('common/redux/openMessageBox', () => {
  it('returns correct action by openMessageBox', () => {
    expect(openMessageBox()).toHaveProperty('type', COMMON_OPEN_MESSAGE_BOX);
  });

  it('handles action type COMMON_OPEN_MESSAGE_BOX correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_OPEN_MESSAGE_BOX }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
