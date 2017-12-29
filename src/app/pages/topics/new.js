import React from 'react';
import { connect } from 'react-redux';

import BasePage from '../../components/common/base_page';

import Form from './form';
import { createTopic } from '../../redux/actions/index';

class New extends BasePage {
  onSubmit(values) {
    this.props.createTopic(values, () => {
      this.props.history.push('/topics');
    }, () => {
      alert('Unable to create topic');
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}
            action="Create topic"
            label="Add new topic" />
    );
  }
}

export default connect(null, { createTopic })(New);
