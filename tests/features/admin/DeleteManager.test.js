import React from 'react';
import { shallow } from 'enzyme';
import { DeleteManager } from '../../../src/features/admin/DeleteManager';

describe('admin/DeleteManager', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DeleteManager {...props} />
    );

    expect(
      renderedComponent.find('.admin-delete-manager').length
    ).toBe(1);
  });
});
