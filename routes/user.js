const express =  require('express');
const UserService = require('../services/user');
const passport = require('passport');

const { userIdSchema, createUserSchema, updateUserSchema} = require('../util/schemas/user');
const validationHandler = require('../util/middleware/validationHandler');
const scopesValidationHandler = require('../util/middleware/scopesValidationHandler');

require('../util/auth/stategies/jwt');

function userApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const userService = new UserService();

  router.get('/', 
  //passport.authenticate('jwt', { session: false }),
  async function(req, res, next) {
    const { userName } = req.query;
    try {

      const users = await userService.getUsers({ userName });
            
      res.status(200).json({
        data: users,
        message: 'Users listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:userId', 
  //passport.authenticate('jwt', { session: false }), 
  //validationHandler({ userId: userIdSchema }, 'params'),
  async function(req, res, next){
    const { userId } = req.params;
    try {
      const user = await userService.getUserById({ userId });

      res.status(200).json({
        data: user,
        message: 'User retrived'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', 
  //passport.authenticate('jwt', { session: false }), 
  //validationHandler(createUserSchema), 
  async function(req, res, next){
    const { body: user } = req;

    try {
      const userCreatedId = await userService.createUser({ user });  

      res.status(201).json({
        data: userCreatedId,
        message: 'User created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId', 
  //passport.authenticate('jwt', { session: false }), 
  //validationHandler({ userId: userIdSchema }, 'params'), 
  //validationHandler(updateUserSchema), 
  async function(req, res, next) {
      const { userId } = req.params;
      const { body: user } = req;

      try {
        const updateUserId = await userService.updateUser({
          userId,
          user
        });

        res.status(200).json({
          data: updateUserId,
          message: 'User updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete('/:userId', 
  //passport.authenticate('jwt', { session: false }), 
  //validationHandler({ userId: userIdSchema }, 'params'), 
  async function(req, res, next) {
      const { userId } = req.params;

      try {
        const deletedUserId = await userService.deleteUser({ userId });

        res.status(200).json({
          data: deletedUserId,
          message: 'User deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userApi;