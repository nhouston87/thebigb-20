const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if(!Validator.isLength(data.password, {min: 8, max:30})) {
    errors.password = 'Password must be minimum of 8 characters';
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password is required';
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
