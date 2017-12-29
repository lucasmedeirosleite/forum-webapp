export default class SignUpValidator {
  validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.email) {
      errors.email = 'E-mail is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  }
}
