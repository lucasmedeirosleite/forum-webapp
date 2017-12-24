export default class SignInValidator {
  validate(values) {
    const errors = {};

    if (!values.email) {
      errors.email = 'E-mail is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  }
}
