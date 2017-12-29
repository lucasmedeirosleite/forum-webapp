import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Input from '../../components/form/input';
import PostValidator from '../../domain/validators/post_validator';

import profileImage from '../../assets/images/avatar.png';

class PostForm extends Component {
  afterSubmit(values) {
    this.props.onSubmit(values);
    this.props.reset();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <span className="thumb-xs avatar pull-xs-left mr-sm">
          <img className="img-circle" src={profileImage} alt="..." />
        </span>

        <form onSubmit={handleSubmit(this.afterSubmit.bind(this))}>
          <Input type="text"
            name="description"
            containerClass="comment-body"
            placeholder="Write your comment..." />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  validate: new PostValidator().validate,
  form: 'PostForm',
  fields: ['description']
})(PostForm);
