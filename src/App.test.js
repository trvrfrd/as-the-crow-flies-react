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

  test('shows itinerary when both selections made', async () => {
    const wrapper = await mount(<App loadAirports={loadAirports} />);

    wrapper.find('#from').simulate('change', { target: { value: 'jfk' } });
    wrapper.find('.suggestion').first().simulate('click');
    wrapper.find('#to').simulate('change', { target: { value: 'lax' } });
    wrapper.find('.suggestion').first().simulate('click');

    expect(wrapper.find('.itinerary')).toHaveLength(1);
  })
});
