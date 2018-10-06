import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/article/DefaultPage';

describe('article/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      article: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.article-default-page').length
    ).toBe(1);
  });
});
