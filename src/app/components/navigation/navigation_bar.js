import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './search_bar';
import AccountBox from './account_box';

export default class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dashboard">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <i className="fa fa-circle text-gray mr-n-sm"></i>
              <i className="fa fa-circle text-warning"></i>
              &nbsp;
              Forum app
              &nbsp;
              <i className="fa fa-circle text-warning mr-n-sm"></i>
              <i className="fa fa-circle text-gray"></i>
            </Link>
          </div>

          <div className="collapse navbar-collapse">
            <SearchBar />

            <ul className="nav navbar-nav pull-xs-right">
              <AccountBox history={this.props.history} />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
