import React from 'react';
import { shallow } from 'enzyme';

import { Loading } from './loading';

describe('<Loading />', () => {
  test('Render del componente Loading', () => {
    const shallowComponent = shallow(<Loading />);
    expect(shallowComponent).toBeDefined();
  });
});
