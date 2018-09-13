import React from 'react';
import { shallow } from 'enzyme';
import { AdminLayout } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AdminLayout />);
  expect(renderedComponent.find('.common-admin-layout').length).toBe(1);
});
