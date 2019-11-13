const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UserService = require('../services/user');
const validationHandler = require('../util/middleware/validationHandler');
const { createUserSchema } = require('../util/schemas/user');

const { config } = require('../config');

// Basic strategy
require('../util/auth/stategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const userService = new UserService();

  //::::::::: sign-in
  router.post('/sign-in', async function(req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', function(error, user) {

      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, userName, email } = user;

          const payload = {
            sub: id,
            userName,
            email,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });

          return res.status(200).json({ token, user: { id, userName, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  //::::::::: sign-in
  router.post('/sign-up', validationHandler(createUserSchema), async function(req, res, next) {
    const { body: user } = req;
    console.log(user);
    
    try {
      
      const createdUserId = await userService.createUser({user});
      res.status(201).json(
        {
          data: createdUserId,
          message: 'User created'
        }
      );
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;