import React, { Component, Fragment } from 'react';

import Typeahead from './Typeahead';
import calculateDistance from './calculateDistance';

export default class App extends Component {
  state = {
    from: null,
    to: null,
    airports: []
  }

  componentDidMount() {
    fetch('https://trvrfrd.github.io/as-the-crow-flies/data/airports.json')
      .then(res => res.json())
      .then(json => this.setState({ airports: json }));
  }

  handleSelect = (endpoint, airport) => {
    this.setState({ [endpoint]: airport });
  }

  formatAirport = a => `(${a.iata}) ${a.name} - ${a.city}, ${a.state}`;

  render() {
    return (
      <Fragment>

        <h1>header</h1>

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

        <output>
          {
            this.state.from && this.state.to
            ? calculateDistance(this.state.from, this.state.to)
            : null
          }
        </output>

      </Fragment>
    );
  }
}
