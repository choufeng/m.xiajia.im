import React from 'react';
import { shallow } from 'enzyme';
import { ArticleTable } from '../../../src/features/article/ArticleTable';

describe('article/ArticleTable', () => {
  it('renders node with correct class name', () => {
    const props = {
      article: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ArticleTable {...props} />
    );

    expect(
      renderedComponent.find('.article-article-table').length
    ).toBe(1);
  });
});
