import React from 'react';
import { shallow } from 'enzyme';
import { ArticleForm } from '../../../src/features/article/ArticleForm';

describe('article/ArticleForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      article: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ArticleForm {...props} />
    );

    expect(
      renderedComponent.find('.article-article-form').length
    ).toBe(1);
  });
});
