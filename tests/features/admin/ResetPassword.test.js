import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../../../src/features/admin/ResetPassword';

describe('admin/ResetPassword', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ResetPassword {...props} />
    );

    expect(
      renderedComponent.find('.admin-reset-password').length
    ).toBe(1);
  });
});
