const express =  require('express');
const MessageService = require('../services/message');
const passport = require('passport');

const { messageIdSchema, createMessageSchema, updateMessageSchema } = require('../util/schemas/message');
const { chatIdSchema } = require('../util/schemas/chat');

const validationHandler = require('../util/middleware/validationHandler');
const scopesValidationHandler = require('../util/middleware/scopesValidationHandler');

require('../util/auth/stategies/jwt');

function messageApi(app) {
  const router = express.Router();
  app.use('/api/messages', router);

  const messageService = new MessageService();

  router.get('/:chatId', 
  //passport.authenticate('jwt', { session: false }),
  //scopesValidationHandler(['read:messages']),
  //validationHandler({ chatId: chatIdSchema }, 'params'), 
  async function(req, res, next){
    const { chatId } = req.params;
    
    try {
      const messages = await messageService.getMessages({ chatId });

      res.status(200).json({
        data: messages,
        message: 'Messages retrived'
      });
    } catch (error) {
      next(error);
    }
  });


  router.post('/', 
  //passport.authenticate('jwt', { session: false }),
  //scopesValidationHandler(['create:messages']),
  //validationHandler(createMessageSchema), 
  async function(req, res, next){
    const { body: message } = req;

    try {
      const messageCreatedId = await messageService.createMessage({ message });  

      res.status(201).json({
        data: messageCreatedId,
        message: 'Message created'
      });
    } catch (error) {
      next(error);
    }
  });


  router.put('/:messageId', 
  //passport.authenticate('jwt', { session: false }),
  //scopesValidationHandler(['update:messages']),
  //validationHandler({ messageId: messageIdSchema }, 'params'), 
  //validationHandler(updateMessageSchema), 
  async function(req, res, next) {
      const { messageId } = req.params;
      const { body: message } = req;

      try {
        const updateMessageId = await messageService.updateMessage({
          messageId,
          message
        });

        res.status(200).json({
          data: updateMessageId,
          message: 'Message updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  
  router.delete('/:messageId', 
  //passport.authenticate('jwt', { session: false }),
  //scopesValidationHandler(['delete:messages']),
  //validationHandler({ messageId: messageIdSchema }, 'params'), 
  async function(req, res, next) {
      const { messageId } = req.params;

      try {
        const deleteMessageId = await messageService.deleteMessage({ messageId });

        res.status(200).json({
          data: deleteMessageId,
          message: 'Message deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = messageApi;