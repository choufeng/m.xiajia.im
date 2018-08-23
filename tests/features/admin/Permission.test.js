import React from 'react';
import { shallow } from 'enzyme';
import { Permission } from '../../../src/features/admin/Permission';

describe('admin/Permission', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Permission {...props} />
    );

    expect(
      renderedComponent.find('.admin-permission').length
    ).toBe(1);
  });
});
