import React from 'react';
import { shallow } from 'enzyme';
import { ManagerContent } from '../../../src/features/admin/ManagerContent';

describe('admin/ManagerContent', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ManagerContent {...props} />
    );

    expect(
      renderedComponent.find('.admin-manager-content').length
    ).toBe(1);
  });
});
