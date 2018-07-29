import { calculateDistance } from './utils';

test('calculateDistance calculates distance in nautical miles', () => {
  const jfk = { lat: 40.63980103, lon: -73.77890015 };
  const lax = { lat: 33.94250107, lon: -118.4079971 };

  // not even fucking with floating point imprecision here
  expect(calculateDistance(jfk, lax).toFixed(0)).toBe('3974');
});
