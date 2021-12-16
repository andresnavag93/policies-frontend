import React from 'react';
import { shallow } from 'enzyme';

import { Content } from './content';

describe('<Content />', () => {
  test('Render del componente Content', () => {
    const shallowComponent = shallow(
      <Content>
        <h1></h1>
      </Content>,
    );
    expect(shallowComponent).toBeDefined();
  });
});
