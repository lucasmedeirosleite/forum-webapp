import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class TextArea extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${touched && error ? 'parsley-error' : ''}`;

    return (
      <div className="form-group row">
        <label htmlFor={field.id} className="col-md-2 form-control-label text-md-right">
          {field.label}
        </label>

        <div className="col-md-10">
          <textarea
            id={field.id}
            className={className}
            placeholder={field.placeholder}
            rows={field.rows}
            {...field.input} />

          {touched && error ?
            <ul className="parsley-errors-list filled">
              <li>{error}</li>
            </ul> : ''
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <Field
        id={this.props.id}
        label={this.props.label}
        name={this.props.name}
        placeholder={this.props.placeholder}
        rows={this.props.rows}
        component={this.renderField}
      />
    );
  }
}
