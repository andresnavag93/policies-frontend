import React from 'react';
import { shallow } from 'enzyme';

import { Layout } from './layout';

describe('<Layout />', () => {
  test('Render del componente Layout', () => {
    const shallowComponent = shallow(
      <Layout>
        <h1></h1>
      </Layout>,
    );
    expect(shallowComponent).toBeDefined();
  });
});
