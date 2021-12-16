import React from 'react';
import { mount } from 'enzyme';

import {AgentsTemplate} from './index';
import { ContextProvider } from '../../../context/contextProvider';

describe('<Agents  />', () => {
  test('Render del componente Agents ', () => {
    const mountComponent = mount(
      <ContextProvider>
        <AgentsTemplate />
      </ContextProvider>,
    );
    expect(mountComponent).toBeDefined();
  });
});
