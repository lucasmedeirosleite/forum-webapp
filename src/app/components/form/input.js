import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class Input extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${touched && error ? 'parsley-error' : ''}`;

    return (
      <div className="form-group">
        <input type={this.props.type} className={className} {...field.input} />
        {touched && error ? this.renderError(error) : ''}
      </div>
    );
  }

  renderError(error) {
    return(
      <ul className="parsley-errors-list filled">
        <li>{error}</li>
      </ul>
    );
  }

  render() {
    return (
      <Field
        name={this.props.name}
        component={this.renderField.bind(this)}
      />
    );
  }
}
