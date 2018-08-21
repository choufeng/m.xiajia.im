import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/admin/Layout';

describe('admin/Layout', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Layout {...props} />
    );

    expect(
      renderedComponent.find('.admin-layout').length
    ).toBe(1);
  });
});
