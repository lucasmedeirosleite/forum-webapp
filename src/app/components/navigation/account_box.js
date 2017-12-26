import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../redux/actions/index';

class AccountBox extends Component {
  onSignOut(event) {
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

export default connect(null, { signOut })(AccountBox);
