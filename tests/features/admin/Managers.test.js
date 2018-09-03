import React from 'react';
import { shallow } from 'enzyme';
import { Managers } from '../../../src/features/admin/Managers';

describe('admin/Managers', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Managers {...props} />
    );

    expect(
      renderedComponent.find('.admin-managers').length
    ).toBe(1);
  });
});
