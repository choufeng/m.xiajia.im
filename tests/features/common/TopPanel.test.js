import React from 'react';
import { shallow } from 'enzyme';
import { TopPanel } from '../../../src/features/common/TopPanel';

describe('common/TopPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TopPanel {...props} />
    );

    expect(
      renderedComponent.find('.common-top-panel').length
    ).toBe(1);
  });
});
