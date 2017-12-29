import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class Input extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const containerClass = `${field.containerClass ? field.containerClass : 'form-group' }`
    const className = `form-control ${touched && error ? 'parsley-error' : ''}`;

    return (
      <div className={containerClass}>
        <input
           type={field.type}
           className={className}
           placeholder={field.placeholder}
           {...field.input} />

        {touched && error ?
          <ul className="parsley-errors-list filled">
            <li>{error}</li>
          </ul> : ''
        }
      </div>
    );
  }

  render() {
    return (
      <Field
        type={this.props.type}
        name={this.props.name}
        containerClass={this.props.containerClass}
        placeholder={this.props.placeholder}
        component={this.renderField}
      />
    );
  }
}
