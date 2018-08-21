import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../../../src/features/admin/SidePanel';

describe('admin/SidePanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SidePanel {...props} />
    );

    expect(
      renderedComponent.find('.admin-side-panel').length
    ).toBe(1);
  });
});
