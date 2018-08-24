import React from 'react';
import { shallow } from 'enzyme';
import { GroupNodes } from '../../../src/features/admin/GroupNodes';

describe('admin/GroupNodes', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GroupNodes {...props} />
    );

    expect(
      renderedComponent.find('.admin-group-nodes').length
    ).toBe(1);
  });
});
