import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CentralizedContainer from '../../components/centralized_container';

export default class SignIn extends Component {
  render() {
    return (
      <CentralizedContainer title="Sign in" description="Don't have an account? Sign up now!">
        <form className="login-form mt-lg">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" />
          </div>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Password" />
          </div>

          <div className="clearfix">
            <div className="btn-toolbar">
              <Link className="btn btn-secondary btn-sm" to="/users/sign_up">
                Sign up
              </Link>
              <a className="btn btn-inverse btn-sm pull-xs-right" href="/">Sign in</a>
            </div>
          </div>
        </form>
      </CentralizedContainer>
    );
  }
}
