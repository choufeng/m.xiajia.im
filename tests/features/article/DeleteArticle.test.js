import React from 'react';
import { shallow } from 'enzyme';
import { DeleteArticle } from '../../../src/features/article/DeleteArticle';

describe('article/DeleteArticle', () => {
  it('renders node with correct class name', () => {
    const props = {
      article: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DeleteArticle {...props} />
    );

    expect(
      renderedComponent.find('.article-delete-article').length
    ).toBe(1);
  });
});
