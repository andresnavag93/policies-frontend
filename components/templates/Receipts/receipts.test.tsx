import React from 'react';
import { mount } from 'enzyme';

import {ReceiptsTemplate} from './index';
import { ContextProvider } from '../../../context/contextProvider';

describe('<Receipts  />', () => {
  test('Render del componente Receipts ', () => {
    const mountComponent = mount(
      <ContextProvider>
        <ReceiptsTemplate />
      </ContextProvider>,
    );
    expect(mountComponent).toBeDefined();
  });
});