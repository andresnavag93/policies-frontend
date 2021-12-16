import React from 'react';
import { shallow } from 'enzyme';

import { Footer } from './footer';

describe('<Footer />', () => {
  test('Render del componente Footer', () => {
    const shallowComponent = shallow(<Footer />);
    expect(shallowComponent).toBeDefined();
  });
});
