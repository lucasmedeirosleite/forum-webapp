import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class TextField extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${touched && error ? 'parsley-error' : ''}`;

    return (
      <div className="form-group row">
        <label htmlFor={field.id} className="col-md-2 form-control-label text-md-right">
          {field.label}
        </label>

        <div className="col-md-10">
          <input type="text"
                 id={field.id}
                 placeholder={field.placeholder}
                 className={className}
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
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        component={this.renderField}
      />
    );
  }
}
