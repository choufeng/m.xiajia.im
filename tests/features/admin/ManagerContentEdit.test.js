import React from 'react';
import { shallow } from 'enzyme';
import { ManagerContentEdit } from '../../../src/features/admin/ManagerContentEdit';

describe('admin/ManagerContentEdit', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ManagerContentEdit {...props} />
    );

    expect(
      renderedComponent.find('.admin-manager-content-edit').length
    ).toBe(1);
  });
});
