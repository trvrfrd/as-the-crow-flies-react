import React, { Component, Fragment } from 'react';

import Typeahead from './Typeahead';
import { calculateDistance } from './utils';
import { hot } from 'react-hot-loader';

import './App.css';

class App extends Component {
  state = {
    from: null,
    to: null,
    airports: []
  }

  componentDidMount() {
    this.props.loadAirports()
      .then(json => this.setState({ airports: json.airports }));
  }

  handleSelect = (endpoint, airport) => {
    this.setState({ [endpoint]: airport });
  }

  formatAirport = a => `(${a.iata}) ${a.name} - ${a.city}, ${a.state}`;

  render() {
    return (
      <Fragment>

        <header>
          <h1>As the Crow Flies</h1>
        </header>

        <main>
          <div className="typeaheads">
            <Typeahead
              name="from"
              placeholder="IATA code, airport name, city, or state"
              source={this.state.airports}
              maxSuggestions={10}
              formatSuggestion={this.formatAirport}
              onSelect={this.handleSelect.bind(this, 'from')}
            />

            <Typeahead
              name="to"
              placeholder="IATA code, airport name, city, or state"
              source={this.state.airports}
              maxSuggestions={10}
              formatSuggestion={this.formatAirport}
              onSelect={this.handleSelect.bind(this, 'to')}
            />
          </div>

          {
            this.state.from && this.state.to
            ? <Itinerary origin={this.state.from} destination={this.state.to} />
            : null
          }
        </main>

      </Fragment>
    );
  }
}

App.defaultProps = {
  loadAirports: () => import('./airports.json')
}

const Itinerary = ({ origin, destination}) => {
  const distance = calculateDistance(origin, destination).toFixed(0);
  return (
    <div className="itinerary">
      <p>
        {`${origin.iata} ✈ ${destination.iata}: ${distance} nautical miles`}
      </p>
      <iframe
        src={mapsEmbedURL(origin, destination)}
      />
    </div>
  )
}

function mapsEmbedURL(origin, destination) {
  return 'https://www.google.com/maps/embed/v1/directions'
    + '?key=AIzaSyBz_m7FJ6G821bn-cmcLlmLzBaVc-xQquM'
    + `&origin=${encodeLatLon(origin)}`
    + `&destination=${encodeLatLon(destination)}`
    + '&mode=flying'
}

function encodeLatLon(place) {
  return encodeURIComponent(`${place.lat},${place.lon}`);
}

export default hot(module)(App);
