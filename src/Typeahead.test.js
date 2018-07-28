import React from 'react';
import { shallow, mount } from 'enzyme';
import Typeahead from './Typeahead';

const formatFunction = data => data.text;
const source = [
  { text: 'apple' },
  { text: 'banana' },
  { text: 'cherry' }
];

describe('Typeahead', () => {

  test('basic rendering snapshot', () => {
    const wrapper = shallow(<Typeahead />);
    expect(wrapper).toMatchSnapshot();
  });


  test('shows suggestion when there is a single match', () => {
    const onSelect = () => { };
    const wrapper = mount(
      <Typeahead
        formatSuggestion={formatFunction}
        source={source}
        onSelect={onSelect}
      />
    );
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'c' } });

    expect(wrapper.find('.suggestion')).toHaveLength(1);
    expect(wrapper.find('.suggestion').text()).toBe('cherry');
  });

});
