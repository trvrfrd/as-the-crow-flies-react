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
      <fieldset>
        <label htmlFor={this.props.name}>{this.props.name} :</label>
        <br />
        <input
          id={this.props.name}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}
