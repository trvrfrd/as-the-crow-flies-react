import React, { Component } from 'react';

export default class Typeahead extends Component {
  state = {
    query: '',
    showSuggestions: false,
  }

  handleChange = e => this.handleQuery(e.target.value);

  handleQuery = query => {
    this.props.onSelect(null);
    const showSuggestions = query.length > 0;
    this.setState({
      query,
      showSuggestions
    });
  }

  handleSelect = data => {
    this.props.onSelect(data);
    this.setState({
      showSuggestions: false,
      query: this.props.formatSuggestion(data)
    });
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
      <div className="typeahead">

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
            <div className="suggestions">
              {this.getQueryResults().map((data, idx) =>
                <div
                  className="suggestion"
                  key={idx}
                  onClick={() => this.handleSelect(data)}
                >
                  {this.props.formatSuggestion(data)}
                </div>
              )}
            </div>
            : null
        }

      </div>
    )
  }
}
