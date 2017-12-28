import React, { Component } from 'react';
import NavigationBar from '../navigation/navigation_bar';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <NavigationBar onSearch={this.props.onSearch} history={this.props.history} />

        <div className="content-wrap">
          <main id="content" className="content" role="main">
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}
