import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/category/DefaultPage';

describe('category/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      category: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.category-default-page').length
    ).toBe(1);
  });
});
