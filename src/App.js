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
          placeholder="from"
          source={this.state.airports}
          onSelect={this.handleSelect.bind(this, 'from')}
        />

        <Typeahead
          name="to"
          placeholder="to"
          source={this.state.airports}
          onSelect={this.handleSelect.bind(this, 'to')}
        />
        <output>results</output>
      </div>
    );
  }
}
