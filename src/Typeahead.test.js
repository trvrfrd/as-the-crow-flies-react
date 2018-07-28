import React from 'react';
import { shallow } from 'enzyme';
import Typeahead from './Typeahead';

const formatFunction = JSON.stringify;

test('Typeahead basic rendering snapshot', () => {
  const wrapper = shallow(<Typeahead />);
  expect(wrapper).toMatchSnapshot();
});
