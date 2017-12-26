import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class AccountBox extends Component {
  onSignOut(event) {
    event.preventDefault();
    alert('Sign out!');
  }

  render() {
    return (
      <li className="dropdown nav-item">
        <Link to="/" onClick={this.onSignOut.bind(this)} className="dropdown-item">
          <i className="fa fa-sign-out"></i> &nbsp; Sign out
        </Link>
      </li>
    );
  }
}
