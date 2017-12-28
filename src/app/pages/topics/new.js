import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppContainer from '../../components/containers/app_container';
import Breadcrumb from '../../components/navigation/breadcrumb';

export default class New extends Component {
  render() {
    return (
      <AppContainer>
        <Breadcrumb>
          <li><Link to="/topics">Topics</Link></li>
          <li className="active">New topic</li>
        </Breadcrumb>
      </AppContainer>
    );
  }
}
