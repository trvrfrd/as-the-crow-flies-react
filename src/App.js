import React, { Component } from 'react';

import Input from './Input';

export default class App extends Component {
  state = {
    from: '',
    to: ''
  }

  render() {
    return (
      <div
        class="app--main"
        style={{
          width: '100vw',
          height: '100vh'
        }}
      >
        <h1>header</h1>
        <Input
          name="from"
          placeholder="from"
          onChange={value => this.setState({ from: value })}
        />
        <Input
          name="to"
          placeholder="to"
          onChange={value => this.setState({ to: value })}
        />
        <output>results</output>
      </div>
    );
  }
}
