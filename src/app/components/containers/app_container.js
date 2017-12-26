import React, { Component } from 'react';
import NavigationBar from '../navigation/navigation_bar';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <NavigationBar history={this.props.history} />

        {this.props.children}
      </div>
    );
  }
}
