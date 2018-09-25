import React from 'react';
import { shallow } from 'enzyme';
import { CategoryList } from '../../../src/features/category/CategoryList';

describe('category/CategoryList', () => {
  it('renders node with correct class name', () => {
    const props = {
      category: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CategoryList {...props} />
    );

    expect(
      renderedComponent.find('.category-category-list').length
    ).toBe(1);
  });
});
