export default class PostValidator {
  validate(values) {
    const errors = {};

    if (!values.description) {
      errors.description = 'Description is required';
    }

    return errors;
  }
}
