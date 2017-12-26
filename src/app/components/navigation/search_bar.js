import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <form className="navbar-form pull-xs-left" role="search">
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search"></i>
            </span>
            <input className="form-control" type="text" placeholder="Search for a topic..." />
          </div>
        </div>
      </form>
    );
  }
}
