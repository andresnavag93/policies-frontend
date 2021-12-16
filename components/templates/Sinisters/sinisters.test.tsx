import React from 'react';
import { mount } from 'enzyme';

import {SinistersTemplate} from './index';
//import Sinisters from '../../../pages/sinisters/index';
import { ContextProvider } from '../../../context/contextProvider';

describe('<Sinisters  />', () => {
  test('Render del componente Sinisters ', () => {
    const mountComponent = mount(
      <ContextProvider>
        <SinistersTemplate />
      </ContextProvider>,
    );
    expect(mountComponent).toBeDefined();
  });
});
