import React, { Component } from 'react';

import Typeahead from './Typeahead';

export default class App extends Component {
  state = {
    from: '',
    to: '',
    airports: []
  }

  componentDidMount() {
    fetch('https://trvrfrd.github.io/as-the-crow-flies/data/airports.json')
      .then(res => res.json())
      .then(json => this.setState({ airports: json }));
  }

  handleSelect = (direction, airport) => {
    console.log(airport);
    // const { iata, name, lat, lon } = airport;
  }

  formatAirport = a => `(${a.iata}) ${a.name} - ${a.city}, ${a.state}`;

  render() {
    return (
      <div
        className="app--main"
        style={{
          width: '100vw',
          height: '100vh'
        }}
      >
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

        <output>results</output>
      </div>
    );
  }
}
