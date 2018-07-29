import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App', () => {
  test('basic rendering snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
