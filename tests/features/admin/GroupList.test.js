import React from 'react';
import { shallow } from 'enzyme';
import { GroupList } from '../../../src/features/admin/GroupList';

describe('admin/GroupList', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GroupList {...props} />
    );

    expect(
      renderedComponent.find('.admin-group-list').length
    ).toBe(1);
  });
});
