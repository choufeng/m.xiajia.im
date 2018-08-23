import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../../../src/features/home/Logout';

describe('home/Logout', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Logout {...props} />
    );

    expect(
      renderedComponent.find('.home-logout').length
    ).toBe(1);
  });
});
