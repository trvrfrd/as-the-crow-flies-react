import React, { Component } from 'react';

export default class Input extends Component {
  state = {
    value: ''
  }

  handleChange = e => {
    this.setState(
      { value: e.target.value },
      () => this.props.onChange(this.state.value)
    );
  }

  render() {
    return (
      <input
        {...this.props}
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}
