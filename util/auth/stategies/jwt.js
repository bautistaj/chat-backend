const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/user');

const { config } = require('../../../config');


passport.use( new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
    async function(tokenPayload, callBack){
      const userService = new UserService();

      try { 
        const user = userService.getUsers();

        if(!user){
          callBack(boom.unauthorized(), false);
        }

        delete user.password;

        callBack(null, {...user, scopes: tokenPayload.scopes });

      } catch (error) {
        callBack(error);
      }
  })
);