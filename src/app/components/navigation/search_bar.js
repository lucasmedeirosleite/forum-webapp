import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onChange(event) {
    this.setState({ term: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}
            className="navbar-form pull-xs-left"
            role="search">

        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search"></i>
            </span>

            <input onChange={this.onChange.bind(this)}
                   className="form-control"
                   type="text"
                   placeholder="Search for a topic..."
                   name="search-topic-term" />
          </div>
        </div>
      </form>
    );
  }
}
