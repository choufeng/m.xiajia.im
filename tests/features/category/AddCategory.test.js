import React from 'react';
import { shallow } from 'enzyme';
import { AddCategory } from '../../../src/features/category/AddCategory';

describe('category/AddCategory', () => {
  it('renders node with correct class name', () => {
    const props = {
      category: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddCategory {...props} />
    );

    expect(
      renderedComponent.find('.category-add-category').length
    ).toBe(1);
  });
});
