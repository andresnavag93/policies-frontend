import React from 'react';
import { mount } from 'enzyme';

import { Login } from './login';

describe('<Login  />', () => {
  test('Render del componente Login ', () => {
    const mountComponent = mount(<Login />);
    expect(mountComponent).toBeDefined();
  });
});
