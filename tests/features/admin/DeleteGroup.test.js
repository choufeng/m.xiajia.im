import React from 'react';
import { shallow } from 'enzyme';
import { DeleteGroup } from '../../../src/features/admin/DeleteGroup';

describe('admin/DeleteGroup', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DeleteGroup {...props} />
    );

    expect(
      renderedComponent.find('.admin-delete-group').length
    ).toBe(1);
  });
});
