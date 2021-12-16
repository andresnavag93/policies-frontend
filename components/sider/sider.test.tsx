import React from 'react';
import { shallow } from 'enzyme';

import { Sider } from './sider';
import { ContextProvider } from 'context/contextProvider';

describe('<Sider />', () => {
  test('Render del componente Sider', () => {
    const shallowComponent = shallow(
      <ContextProvider>
        <Sider />
      </ContextProvider>,
    );
    expect(shallowComponent).toBeDefined();
  });
});
