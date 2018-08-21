import React from 'react';
import { shallow } from 'enzyme';
import { TopPanel } from '../../../src/features/admin/TopPanel';

describe('admin/TopPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TopPanel {...props} />
    );

    expect(
      renderedComponent.find('.admin-top-panel').length
    ).toBe(1);
  });
});
