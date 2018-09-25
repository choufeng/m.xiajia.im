import React from 'react';
import { shallow } from 'enzyme';
import { RootCategorys } from '../../../src/features/category/RootCategorys';

describe('category/RootCategorys', () => {
  it('renders node with correct class name', () => {
    const props = {
      category: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RootCategorys {...props} />
    );

    expect(
      renderedComponent.find('.category-root-categorys').length
    ).toBe(1);
  });
});
