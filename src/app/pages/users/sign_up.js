import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CentralizedContainer from '../../components/containers/centralized_container';

export default class SignUp extends Component {
  render() {
    return (
      <CentralizedContainer title="Sign up" description="Please fill in your information.">
        <form className="login-form mt-lg">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Name" />
          </div>

          <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" />
          </div>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Password" />
          </div>

          <div className="clearfix">
            <div className="btn-toolbar">
              <Link className="btn btn-secondary btn-sm" to="/users/sign_in">
                Back
              </Link>
              <a className="btn btn-inverse btn-sm pull-xs-right" href="/">Create account</a>
            </div>
          </div>
        </form>
      </CentralizedContainer>
    );
  }
}
