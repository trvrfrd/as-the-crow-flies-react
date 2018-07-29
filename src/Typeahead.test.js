import React from 'react';
import { shallow, mount } from 'enzyme';
import Typeahead from './Typeahead';

describe('Typeahead', () => {

  test('basic rendering snapshot', () => {
    const wrapper = shallow(<Typeahead />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('basic suggestions', () => {
    const formatFunction = data => data.text;
    const source = [
      { text: 'apple' },
      { text: 'banana' },
      { text: 'cherry' }
    ];
    const onSelect = () => { };
    let wrapper;
    let input;

    beforeEach(() => {
      wrapper = mount(
        <Typeahead
          formatSuggestion={formatFunction}
          source={source}
          onSelect={onSelect}
        />
      );
      input = wrapper.find('input');
    });

    afterEach(() => wrapper.unmount());

    test('shows suggestion when there is a single match', () => {
      input.simulate('change', { target: { value: 'c' } });

      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('cherry');
    });

    test('shows suggestions when there are multiple matches', () => {
      input.simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.suggestion')).toHaveLength(2);
      expect(wrapper.find('.suggestion').first().text()).toBe('apple');
      expect(wrapper.find('.suggestion').last().text()).toBe('banana');
    });

    test('maxSuggestions prop limits number of suggestions', () => {
      wrapper.setProps({ maxSuggestions: 1 });
      input.simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('apple');
    });

    test('RegExp-unsafe characters do not cause an error', () => {
      expect(
        () => input.simulate('change', { target: { value: '.*+?^${}()|[]\\' } })
      ).not.toThrow();
    });

    test('RegExp-unsafe character input matches correctly', () => {
      const newSource = source.concat({ text: '(some other fruit)' });
      wrapper.setProps({ source: newSource });
      input.simulate('change', { target: { value: '(' } });
      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('(some other fruit)');
    });

    test('formatSuggestion prop used to format suggestion', () => {
      const formatSuggestion = data => data.text.toUpperCase();
      wrapper.setProps({ formatSuggestion });
      input.simulate('change', { target: { value: 'c' } });
      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('CHERRY');
    });

  });

});
