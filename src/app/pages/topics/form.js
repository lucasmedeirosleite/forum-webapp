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

class Form extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <AppContainer>
        <Breadcrumb>
          <li><Link to="/topics">Topics</Link></li>
          <li className="active">{this.props.label}</li>
        </Breadcrumb>

        <h1 className="page-title">{this.props.label}</h1>

        <div className="row">
          <div className="col-lg-12">
            <Card title="Topic information">
              <form onSubmit={handleSubmit(this.props.onSubmit)}
                    className="form-horizontal">
                <TextField
                  id="topic-title"
                  name="title"
                  label="Title"
                  value={this.props.topic ? this.props.topic.title : ''}
                  placeholder="Topic title..." />

                <TextArea
                  id="topic-description"
                  name="description"
                  placeholder="Topic description..."
                  label="Description"
                  value={this.props.topic ? this.props.topic.description : ''}
                  rows="5" />

                <div className="form-actions">
                  <button type="submit" className="btn btn-success btn-rounded pull-xs-right">{this.props.action}</button>
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

function mapStateToProps(state, { topic }) {
  return {
    topic: topic,
    enableReinitialize: true,
    initialValues: {
      title: topic ? topic.title : '',
      description: topic ? topic.description : ''
    }
  };
}

export default connect(mapStateToProps, null)(
  reduxForm({
    validate: new TopicValidator().validate,
    form: 'TopicForm',
    fields: ['title', 'description']
  }
)(Form));
