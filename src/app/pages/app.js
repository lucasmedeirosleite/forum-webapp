import '../assets/stylesheets/application.css';

// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from './users/sign_in';
import SignUp from './users/sign_up';
import TopicsIndex from './topics/index';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TopicsIndex} />
        <Route path="/users/sign_in" component={SignIn} />
        <Route path="/users/sign_up" component={SignUp} />
      </Switch>
    );
  }
}
