import React from 'react';
import { mount } from 'enzyme';

import {PoliciesTemplate} from './index';
//import Policies from '../../../pages/policies/index';
import { ContextProvider } from '../../../context/contextProvider';

describe('<Policies  />', () => {
  test('Render del componente Policies ', () => {
    const mountComponent = mount(
      <ContextProvider>
        <PoliciesTemplate />
      </ContextProvider>,
    );
    expect(mountComponent).toBeDefined();
  });
});
