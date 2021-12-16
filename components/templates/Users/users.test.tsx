import React from 'react';
import { mount } from 'enzyme';

import {UsersTemplate} from './index';
//import Users from '../../../pages/users/index';
import { ContextProvider } from '../../../context/contextProvider';

describe('<Users  />', () => {
  test('Render del componente Users ', () => {
    const mountComponent = mount(
      <ContextProvider>
        <UsersTemplate />
      </ContextProvider>,
    );
    expect(mountComponent).toBeDefined();
  });
});
