import '../assets/stylesheets/application.css';

// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from './users/sign_in';
import SignUp from './users/sign_up';
import TopicsIndex from './topics/index';
import TopicsNew from './topics/new';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/topics/new" component={TopicsNew} />
        <Route path="/topics" component={TopicsIndex} />
        <Route path="/users/sign_in" component={SignIn} />
        <Route path="/users/sign_up" component={SignUp} />
        <Route exact path="/" component={TopicsIndex} />
      </Switch>
    );
  }
}
