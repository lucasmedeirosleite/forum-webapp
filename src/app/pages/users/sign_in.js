import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CentralizedContainer from '../../components/containers/centralized_container';
import Input from '../../components/form/input';

import { currentUser } from '../../domain/services/user_session';
import SignInValidator from '../../domain/validators/users/sign_in_validator';
import { signIn } from '../../redux/actions/index';

class SignIn extends Component {
  componentWillMount() {
    if (!_.isEmpty(currentUser())) {
      this.props.history.push('/');
    }
  }

  onSubmit(values) {
    this.props.signIn(values, () => {
      this.props.history.push('/');
    }, () => {
      alert('Invalid email or password!');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <CentralizedContainer title="Sign in" description="Don't have an account? Sign up now!">

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="login-form mt-lg">
          <Input type="email" name="email" placeholder="E-mail" />

          <Input type="password" name="password" placeholder="Password" />

          <div className="clearfix">
            <div className="btn-toolbar">
              <Link className="btn btn-secondary btn-sm" to="/users/sign_up">
                Sign up
              </Link>

              <button type="submit" className="btn btn-inverse btn-sm pull-xs-right">
                Sign in
              </button>
            </div>
          </div>
        </form>

      </CentralizedContainer>
    );
  }
}

export default reduxForm({
  validate: new SignInValidator().validate,
  form: 'SignInForm'
})(
  connect(null, { signIn })(SignIn)
);
