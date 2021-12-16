import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './header';

describe('<Header />', () => {
  test('Render del componente Header', () => {
    const shallowComponent = shallow(<Header />);
    expect(shallowComponent).toBeDefined();
  });
});
