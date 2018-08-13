import React from 'react';
import { shallow } from 'enzyme';
import { ShowMessage } from '../../../src/features/common/ShowMessage';

describe('common/ShowMessage', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ShowMessage {...props} />
    );

    expect(
      renderedComponent.find('.common-show-message').length
    ).toBe(1);
  });
});
