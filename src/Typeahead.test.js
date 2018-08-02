import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Typeahead from './Typeahead';

const source = [
  { text: 'apple' },
  { text: 'banana' },
  { text: 'cherry' }
];

const formatFunction = data => data.text;
const onSelect = function noop() { };

describe('Typeahead', () => {

  test('basic rendering snapshot', () => {
    const wrapper = TestRenderer.create(<Typeahead />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('suggestions', () => {
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

    it('does not initially show suggestions', () => {
      expect(wrapper.find('.suggestion')).toHaveLength(0);
    });

    it('shows suggestion when there is a single match', () => {
      input.simulate('change', { target: { value: 'c' } });

      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('cherry');
    });

    it('shows suggestions when there are multiple matches', () => {
      input.simulate('change', { target: { value: 'a' } });

      expect(wrapper.find('.suggestion')).toHaveLength(2);

      expect(wrapper.find('.suggestion').first().text()).toBe('apple');
      expect(wrapper.find('.suggestion').last().text()).toBe('banana');
    });

    it('shows no suggestions when these is no match', () => {
      input.simulate('change', { target: { value: 'xyz' } });

      expect(wrapper.find('.suggestion')).toHaveLength(0);
    });

    it('no longer shows suggestions after empty query', () => {
      input.simulate('change', { target: { value: 'a' } });
      input.simulate('change', { target: { value: '' } });

      expect(wrapper.find('.suggestion')).toHaveLength(0);
    });

    it('maxSuggestions prop limits number of suggestions', () => {
      wrapper.setProps({ maxSuggestions: 1 });

      input.simulate('change', { target: { value: 'a' } });

      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('apple');
    });

    it('RegExp-unsafe characters do not cause an error', () => {
      expect(
        () => input.simulate('change', { target: { value: '.*+?^${}()|[]\\' } })
      ).not.toThrow();
    });

    it('RegExp-unsafe character input matches correctly', () => {
      const newSource = source.concat({ text: '(some other fruit)' });
      wrapper.setProps({ source: newSource });

      input.simulate('change', { target: { value: '(' } });

      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('(some other fruit)');
    });

    it('formatSuggestion prop used to format suggestion', () => {
      const formatSuggestion = data => data.text.toUpperCase();
      wrapper.setProps({ formatSuggestion });

      input.simulate('change', { target: { value: 'c' } });

      expect(wrapper.find('.suggestion')).toHaveLength(1);
      expect(wrapper.find('.suggestion').text()).toBe('CHERRY');
    });

    it('highlights matching text of suggestion', () => {
      input.simulate('change', { target: { value: 'ch' } });
      // have to call .render() because we use dangerouslySetInnerHTML (?) oops
      const highlight = wrapper.render().find('.highlight');

      expect(highlight).toHaveLength(1);
      expect(highlight.text()).toBe('ch');
    });

  });

  describe('selections', () => {
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

    afterEach(() => wrapper.unmount());

    it('calls onSelect prop with null on input (selection cleared)', () => {
      input.simulate('change', { target: { value: 'whatever' } });

      expect(onSelect).toHaveBeenCalledWith(null);
    });

    it('calls onSelect prop with correct data when clicking a suggestion', () => {
      input.simulate('change', { target: { value: 'c' } });
      const suggestion = wrapper.find('.suggestion');
      suggestion.simulate('click');

      expect(onSelect).toHaveBeenCalledWith({ text: 'cherry' });
    });

    it('updates value of input with formatted suggestion text', () => {
      const formatSuggestion = data => `a delicious ${data.text}`;
      wrapper.setProps({ formatSuggestion });

      input.simulate('change', { target: { value: 'c' } });
      const suggestion = wrapper.find('.suggestion');
      suggestion.simulate('click');

      expect(input.instance().value).toBe('a delicious cherry');
    });

    it('no longer shows suggestions after making selection', () => {
      input.simulate('change', { target: { value: 'c' } });
      const suggestion = wrapper.find('.suggestion');
      suggestion.simulate('click');

      expect(wrapper.find('.suggestion')).toHaveLength(0);
    });

  });

});
