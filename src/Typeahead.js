import React, { Component, Fragment } from 'react';

export default class Typeahead extends Component {
  state = {
    query: '',
    showSuggestions: false,
    selection: null
  }

  handleChange = e => this.handleQuery(e.target.value);

  handleQuery = query => {
    const showSuggestions = query.length > 0;
    this.setState({ query, showSuggestions });
  }

  handleSelect = data => {
    this.setState(
      {
        showSuggestions: false,
        selection: data,
        query: this.props.formatSuggestion(data)
      },
      () => this.props.onSelect(this.state.selection)
    );
  }

  getQueryResults = () => {
    var regexp = new RegExp(this.state.query, 'i');
    return this.props.source.filter(data =>
      Object.values(data).some(attr => regexp.test(attr))
    ).slice(0, this.props.maxSuggestions || 10);
  }

  render() {
    const { name, placeholder } = this.props;

    return (
      <Fragment>
        <fieldset>
          <label htmlFor={name}>{name}: </label>
          <br />
          <input
            id={name}
            name={name}
            placeholder={placeholder}
            value={this.state.query}
            onChange={this.handleChange}
          />
        </fieldset>
        {
          this.state.showSuggestions
            ?
            <div>
              {this.getQueryResults().map((data, idx) =>
                <div key={idx} onClick={() => this.handleSelect(data)}>
                  {this.props.formatSuggestion(data)}
                </div>
              )}
            </div>
            : null
        }
      </Fragment>
    )
  }
}
