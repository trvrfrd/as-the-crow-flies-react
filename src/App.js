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
    import('./airports.json')
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

const Itinerary = ({ origin, destination}) => {
  const distance = calculateDistance(origin, destination).toFixed(0);
  return (
    <div className="itinerary">
      <p>
        {`${origin.iata} ✈ ${destination.iata}`}
      </p>
      <p>
        {`${distance} nautical miles`}
      </p>
    </div>
  )
}

export default hot(module)(App);
