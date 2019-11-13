const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/user');

passport.use(new BasicStrategy(async function(email, password, callBack) {
  const userService = new UserService();

  try {
    
    const user = await userService.getUser({ email });
    
    if(!user) {
      return callBack(boom.unauthorized(), false);
    }

    if(!(await bcrypt.compare(password, user.password))) {
      return callBack(boom.unauthorized(), false); 
    }

    delete user.password;
    
    return callBack(null, user);

  } catch (error) {
    callBack(error);
  }
}));



