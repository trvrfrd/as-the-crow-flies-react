import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

const airportData = {
  airports: [
    {
      city: "New York",
      iata: "JFK",
      lat: 40.63980103,
      lon: -73.77890015,
      name: "John F Kennedy International Airport",
      state: "New York",
    },
    {
      city: "Los Angeles",
      iata: "LAX",
      lat: 33.94250107,
      lon: -118.4079971,
      name: "Los Angeles International Airport",
      state: "California",
    }
  ]
};

const loadAirports = () => Promise.resolve(airportData);

describe('App', () => {

  test('basic rendering snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('shows itinerary with expected distance when both selections made', async () => {
    const wrapper = await mount(<App loadAirports={loadAirports} />);

    wrapper.find('#from').simulate('change', { target: { value: 'jfk' } });
    wrapper.find('.suggestion').first().simulate('click');
    wrapper.find('#to').simulate('change', { target: { value: 'lax' } });
    wrapper.find('.suggestion').first().simulate('click');

    expect(wrapper.find('.itinerary')).toHaveLength(1);
    expect(wrapper.find('.itinerary').text()).toMatch('3974 nautical miles');
  });

  it('does not show itinerary when only one selection made', async () => {
    const wrapper = await mount(<App loadAirports={loadAirports} />);

    wrapper.find('#from').simulate('change', { target: { value: 'jfk' } });
    wrapper.find('.suggestion').first().simulate('click');

    expect(wrapper.find('.itinerary')).toHaveLength(0);
  });

  it('hides itinerary when changing a query after making both selections', async () => {
    const wrapper = await mount(<App loadAirports={loadAirports} />);

    wrapper.find('#from').simulate('change', { target: { value: 'jfk' } });
    wrapper.find('.suggestion').first().simulate('click');
    wrapper.find('#to').simulate('change', { target: { value: 'lax' } });
    wrapper.find('.suggestion').first().simulate('click');
    wrapper.find('#from').simulate('change', { target: { value: 'jfk' } });

    expect(wrapper.find('.itinerary')).toHaveLength(0);
  });

});
