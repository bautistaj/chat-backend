const boom = require('@hapi/boom');
const joi = require('@hapi/joi');
const UserService = require('../../services/user');

function validate(email, userName) {
  //const email = userService.

  return error;
}

function validateUserHandler() {
  return function(req, res, next) {
    const {email, userName} = req.body;
    const userService = new UserService();
    
    //const error = validate(req[check], schema);
    
    next();
  }
}

module.exports = validateUserHandler;