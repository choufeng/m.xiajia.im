import React from 'react';
import { shallow } from 'enzyme';
import { AddNewManager } from '../../../src/features/admin/AddNewManager';

describe('admin/AddNewManager', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddNewManager {...props} />
    );

    expect(
      renderedComponent.find('.admin-add-new-manager').length
    ).toBe(1);
  });
});
