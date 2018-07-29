import React from 'react';
import { shallow, mount } from 'enzyme';
import Typeahead from './Typeahead';

describe('Typeahead', () => {

  const source = [
    { text: 'apple' },
    { text: 'banana' },
    { text: 'cherry' }
  ];
  const formatFunction = data => data.text;
  const onSelect = function noop() { };

  test('basic rendering snapshot', () => {
    const wrapper = shallow(<Typeahead />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('basic suggestions', () => {
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

    test('suggestions initially not shown', () => {
      expect(wrapper.find('.suggestions')).toHaveLength(0);
      expect(wrapper.find('.suggestion')).toHaveLength(0);
    });

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

    test('suggestions no longer shown after empty query', () => {
      input.simulate('change', { target: { value: 'a' } });
      input.simulate('change', { target: { value: '' } });

      expect(wrapper.find('.suggestions')).toHaveLength(0);
      expect(wrapper.find('.suggestion')).toHaveLength(0);
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

    test('matching text of suggestion is highlighted', () => {
      input.simulate('change', { target: { value: 'ch' } });
      // have to call .render() because we use dangerouslySetInnerHTML (?) oops
      const highlight = wrapper.render().find('.highlight');

      expect(highlight).toHaveLength(1);
      expect(highlight.text()).toBe('ch');
    });

  });

  describe('basic selections', () => {
    let onSelect;
    let wrapper;
    let input;

    beforeEach(() => {
      onSelect = jest.fn();
      wrapper = mount(
        <Typeahead
          formatSuggestion={formatFunction}
          source={source}
          onSelect={onSelect}
        />
      );
      input = wrapper.find('input');
    });

    test('onSelect prop called with null on input (selection cleared)', () => {
      input.simulate('change', { target: { value: 'whatever' } });

      expect(onSelect).toHaveBeenCalledWith(null);
    });

    test('onSelect prop called with corresponding source data when clicking a suggestion', () => {
      input.simulate('change', { target: { value: 'c' } });
      const suggestion = wrapper.find('.suggestion');
      suggestion.simulate('click');

      expect(onSelect).toHaveBeenCalledWith({ text: 'cherry' });
    });

    test('value of input gets updated with formatted suggestion text', () => {
      const formatSuggestion = data => `a delicious ${data.text}`;
      wrapper.setProps({ formatSuggestion });

      input.simulate('change', { target: { value: 'c' } });
      const suggestion = wrapper.find('.suggestion');
      suggestion.simulate('click');

      expect(input.instance().value).toBe('a delicious cherry');
    });

    test('suggestions no longer shown after making selection', () => {
      input.simulate('change', { target: { value: 'c' } });
      const suggestion = wrapper.find('.suggestion');
      suggestion.simulate('click');

      expect(wrapper.find('.suggestions')).toHaveLength(0);
      expect(wrapper.find('.suggestion')).toHaveLength(0);
    });

  });

});