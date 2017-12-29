import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './form';
import { fetchTopic, updateTopic } from '../../redux/actions/index';

class Edit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTopic(id);
  }

  onSubmit(values) {
    const { id } = this.props.match.params;

    this.props.updateTopic(id, values, () => {
      this.props.history.push('/topics');
    }, () => {
      alert('Unable to create topic');
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}
        topic={this.props.topic}
        action="Update topic"
        label={`Editing topic #${this.props.match.params.id}`} />
    );
  }
}

function mapStateToProps({ topics }, ownProps) {
  return { topic: topics[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchTopic, updateTopic })(Edit);
