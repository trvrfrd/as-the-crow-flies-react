import React, { Component } from 'react';

// escape dynamic RegExp so user input doesn't blow it up
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default class Typeahead extends Component {
  state = {
    query: '',
    results: [],
    showSuggestions: false
  }

  handleChange = e => this.handleQuery(e.target.value);

  handleQuery = query => {
    // by definition, there can't be a selection immediately after query input
    // so: make sure parent knows selection is null
    this.props.onSelect(null);

    if (query.length === 0) return this.handleBlankQuery();

    const results = this.getQueryResults(query);
    this.setState({
      query,
      results,
      showSuggestions: true
    });
  }

  handleBlankQuery = () => {
    this.setState({
      query: '',
      results: [],
      showSuggestions: false
    })
  }

  handleSelect = data => {
    this.props.onSelect(data);
    this.setState({
      showSuggestions: false,
      query: this.props.formatSuggestion(data)
    });
  }

  getQueryResults = query => {
    const regexp = new RegExp(escapeRegExp(query), 'i');
    return this.props.source.filter(data =>
      Object.values(data).some(attr => regexp.test(attr))
    ).slice(0, this.props.maxSuggestions || 10);
  }

  highlightQuery = str => {
    const regexp = new RegExp(escapeRegExp(this.state.query), 'ig');
    const __html = str.replace(regexp, match => `<span class="highlight">${match}</span>`);
    return { __html };
  }

  render() {
    const { name, placeholder } = this.props;
    const { results } = this.state;

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
              {results.map((data, idx) =>
                <div
                  className="suggestion"
                  key={idx}
                  onClick={() => this.handleSelect(data)}
                  dangerouslySetInnerHTML={this.highlightQuery(this.props.formatSuggestion(data))}
                />
              )}
            </div>
            : null
        }

      </div>
    )
  }
}
