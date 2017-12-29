import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import CentralizedContainer from '../../components/containers/centralized_container';
import Input from '../../components/form/input';

import SignUpValidator from '../../domain/validators/users/sign_up_validator';
import { signUp } from '../../redux/actions/index';

class SignUp extends Component {
  onSubmit(values) {
    this.props.signUp(values, () => {
      this.props.history.push('/');
    }, () => {
      alert('Unable to create account');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <CentralizedContainer title="Sign up" description="Please fill in your information.">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="login-form mt-lg">
          <Input type="text" name="name" placeholder="Name" />

          <Input type="email" name="email" placeholder="E-mail" />

          <Input type="password" name="password" placeholder="Password" />

          <div className="clearfix">
            <div className="btn-toolbar">
              <Link className="btn btn-secondary btn-sm" to="/users/sign_in">
                Back
              </Link>

              <button type="submit" className="btn btn-inverse btn-sm pull-xs-right">
                Create account
              </button>
            </div>
          </div>
        </form>
      </CentralizedContainer>
    );
  }
}

export default connect(null, { signUp })(
  reduxForm({
    validate: new SignUpValidator().validate,
    form: 'SignUpForm'
  }
)(SignUp));
