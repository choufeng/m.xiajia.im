import React from 'react';
import { shallow } from 'enzyme';
import { ChangePassword } from '../../../src/features/admin';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ChangePassword />);
  expect(renderedComponent.find('.admin-change-password').length).toBe(1);
});
