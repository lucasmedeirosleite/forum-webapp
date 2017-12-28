import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import AppContainer from '../../components/containers/app_container';
import Breadcrumb from '../../components/navigation/breadcrumb';
import ButtonLink from '../../components/common/button_link';
import Card from '../../components/common/card';
import TextArea from '../../components/form/text_area';
import TextField from '../../components/form/text_field';

import TopicValidator from '../../domain/validators/topic_validator';
import { createTopic } from '../../redux/actions/index';

class New extends Component {
  onSubmit(values) {
    this.props.createTopic(values, () => {
      this.props.history.push('/topics');
    }, () => {
      alert('Unable to create topic');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <AppContainer>
        <Breadcrumb>
          <li><Link to="/topics">Topics</Link></li>
          <li className="active">Add new topic</li>
        </Breadcrumb>

        <h1 className="page-title">Add new topic</h1>

        <div className="row">
          <div className="col-lg-12">
            <Card title="Please fill the topic information">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-horizontal">
                <TextField
                   id="topic-title"
                   name="title"
                   label="Title"
                   placeholder="Topic title..." />

                <TextArea
                  id="topic-description"
                  name="description"
                  placeholder="Topic description..."
                  label="Description"
                  rows="5" />

                <div className="form-actions">
                  <button type="submit" className="btn btn-success btn-rounded pull-xs-right">Create topic</button>
                  <ButtonLink to="/topics" type="default">
                    Back
                  </ButtonLink>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </AppContainer>
    );
  }
}

export default reduxForm({
  validate: new TopicValidator().validate,
  form: 'CreateTopicForm'
})(
  connect(null, { createTopic })(New)
);
