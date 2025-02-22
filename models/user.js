const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { // every user has a name field, the requirements for which are described below:
    type: String, // the name is a string
    required: true, // it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length of the name is 30 characters
  },
  avatar: {
    type: String, // the name is a string
    required: true, // it's a required field
    validate: { // validating that the URL is in the correct format
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  }
});

module.exports = mongoose.model('User', userSchema);
