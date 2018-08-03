import React from 'react';
import { shallow } from 'enzyme';
import { LoginBox } from '../../../src/features/home/LoginBox';

describe('home/LoginBox', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginBox {...props} />
    );

    expect(
      renderedComponent.find('.home-login-box').length
    ).toBe(1);
  });
});
