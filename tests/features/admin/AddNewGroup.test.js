import React from 'react';
import { shallow } from 'enzyme';
import { AddNewGroup } from '../../../src/features/admin/AddNewGroup';

describe('admin/AddNewGroup', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddNewGroup {...props} />
    );

    expect(
      renderedComponent.find('.admin-add-new-group').length
    ).toBe(1);
  });
});
