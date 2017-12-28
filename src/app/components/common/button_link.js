import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonLink extends Component {
  render() {
    return (
      <Link to={this.props.to}
            className={`btn btn-${this.props.type} mb-xs ${this.props.className}`}
            role = "button">
        {this.props.children}
      </Link>
    );
  }
}
