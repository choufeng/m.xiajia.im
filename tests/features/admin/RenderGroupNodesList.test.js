import React from 'react';
import { shallow } from 'enzyme';
import { RenderGroupNodesList } from '../../../src/features/admin';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RenderGroupNodesList />);
  expect(renderedComponent.find('.admin-render-group-nodes-list').length).toBe(1);
});
