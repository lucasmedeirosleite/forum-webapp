import '../assets/stylesheets/application.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from './users/sign_in';
import SignUp from './users/sign_up';
import TopicsIndex from './topics/index';
import TopicsNew from './topics/new';
import TopicsEdit from './topics/edit';
import PostsIndex from './posts/index';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TopicsIndex} />
        <Route exact path="/topics/:id/posts" component={PostsIndex} />
        <Route path="/topics/new" component={TopicsNew} />
        <Route path="/topics/:id" component={TopicsEdit} />
        <Route path="/topics" component={TopicsIndex} />
        <Route path="/users/sign_in" component={SignIn} />
        <Route path="/users/sign_up" component={SignUp} />
      </Switch>
    );
  }
}
