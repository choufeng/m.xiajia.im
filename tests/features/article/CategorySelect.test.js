import React from 'react';
import { shallow } from 'enzyme';
import { CategorySelect } from '../../../src/features/article/CategorySelect';

describe('article/CategorySelect', () => {
  it('renders node with correct class name', () => {
    const props = {
      article: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CategorySelect {...props} />
    );

    expect(
      renderedComponent.find('.article-category-select').length
    ).toBe(1);
  });
});
