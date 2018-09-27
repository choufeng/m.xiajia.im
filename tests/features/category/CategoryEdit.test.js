import React from 'react';
import { shallow } from 'enzyme';
import { CategoryEdit } from '../../../src/features/category/CategoryEdit';

describe('category/CategoryEdit', () => {
  it('renders node with correct class name', () => {
    const props = {
      category: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CategoryEdit {...props} />
    );

    expect(
      renderedComponent.find('.category-category-edit').length
    ).toBe(1);
  });
});
