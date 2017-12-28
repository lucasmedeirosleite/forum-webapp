import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from './search_bar';

import { signOut } from '../../redux/actions/index';

class NavigationBar extends Component {
  onSignOut(event) {
    event.preventDefault();

    this.props.signOut(() => {
      this.props.history.push('/users/sign_in');
    }, (error) => {
      if (error.success) {
        this.props.history.push('/users/sign_in');
      } else {
        alert('Unable to sign out user');
      }
    });
  }

  renderSearchBar() {
    if (this.props.onSearch) {
      return <SearchBar onSearch={this.props.onSearch} />
    }
  }

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
            {this.renderSearchBar()}

            <ul className="nav navbar-nav pull-xs-right">
              <li className="dropdown nav-item">
                <Link to="/" onClick={this.onSignOut.bind(this)} className="dropdown-item">
                  <i className="fa fa-sign-out"></i>
                  &nbsp; Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(null, { signOut })(NavigationBar);
