import React from 'react';
import { shallow } from 'enzyme';
import { ManagerList } from '../../../src/features/admin/ManagerList';

describe('admin/ManagerList', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ManagerList {...props} />
    );

    expect(
      renderedComponent.find('.admin-manager-list').length
    ).toBe(1);
  });
});
