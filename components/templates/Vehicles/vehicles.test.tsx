import React from 'react';
import { mount } from 'enzyme';

import {VehiclesTemplate} from './index';
//import Users from '../../../pages/users/index';
import { ContextProvider } from '../../../context/contextProvider';

describe('<Vehicles  />', () => {
  test('Render del componente Users ', () => {
    const mountComponent = mount(
      <ContextProvider>
        <VehiclesTemplate/>
      </ContextProvider>,
    );
    expect(mountComponent).toBeDefined();
  });
});
