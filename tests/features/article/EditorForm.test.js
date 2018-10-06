import React from 'react';
import { shallow } from 'enzyme';
import { EditorForm } from '../../../src/features/article';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<EditorForm />);
  expect(renderedComponent.find('.article-editor-form').length).toBe(1);
});
