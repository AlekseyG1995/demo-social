export const validationRules = {
  username: {
    required: 'username must be not empty'
  },
  email: {
    required: 'email must be not empty',
    // eslint-disable-next-line max-len
    pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    patternError: 'Email is not valid'
  },
  password: {
    required: 'password must be not empty',
    minValue: 'password must be at least 8 characters',
    maxValue: 'password must be at maximum 32 characters'
  },
  DOB: {
    required: 'DOB must be not empty',
  }
}