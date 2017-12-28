import React, { Component } from 'react';

export default class Breadcrum extends Component {
  render() {
    return (
      <ol className="breadcrumb">
        <li>YOU ARE HERE</li>
        {this.props.children}
      </ol>
    );
  }
}
