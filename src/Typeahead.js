import React, { Component, Fragment } from 'react';
import Input from './Input';

export default class Typeahead extends Component {
  state = {
    query: '',
    showSuggestions: false,
    selection: null
  }

  handleQuery = query => {
    const showSuggestions = query.length > 0;
    this.setState({ query, showSuggestions });
  }

  handleSelect = data => {
    this.setState(
      {
        showSuggestions: false,
        selection: data
      },
      () => this.props.onSelect(this.state.selection)
    );
  }

  getQueryResults = () => {
    var regexp = new RegExp(this.state.query, 'i');
    return this.props.source.filter(thing =>
      Object.values(thing).some(attr => regexp.test(attr))
    ).slice(0, 10);
  }

  render() {
    const { name, placeholder } = this.props;

    return (
      <Fragment>
        <Input
          name={name}
          placeholder={placeholder}
          onChange={this.handleQuery}
        />
        {
          this.state.showSuggestions
            ?
            <div>
              {this.getQueryResults().map((r, idx) =>
                <div key={idx} onClick={() => this.handleSelect(r)}>
                  {JSON.stringify(r)}
                </div>
              )}
            </div>
            : null
        }
      </Fragment>
    )
  }
}
