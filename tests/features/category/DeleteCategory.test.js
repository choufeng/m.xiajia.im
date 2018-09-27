import React from 'react';
import { shallow } from 'enzyme';
import { DeleteCategory } from '../../../src/features/category/DeleteCategory';

describe('category/DeleteCategory', () => {
  it('renders node with correct class name', () => {
    const props = {
      category: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DeleteCategory {...props} />
    );

    expect(
      renderedComponent.find('.category-delete-category').length
    ).toBe(1);
  });
});
