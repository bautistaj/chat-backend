const express =  require('express');
const ChatService = require('../services/chat');
const passport = require('passport');

const { createChatSchema, chatIdSchema } = require('../util/schemas/chat');
const validationHandler = require('../util/middleware/validationHandler');

require('../util/auth/stategies/jwt');

function chatApi(app) {
  const router = express.Router();
  app.use('/api/chats', router);

  const chatService = new ChatService();

  router.get('/:userId', passport.authenticate('jwt', { session: false }), validationHandler({ userId: chatIdSchema }, 'params'),async function(req, res, next){
    const { userId } = req.params;

    try {
      const chats = await chatService.getChats({ userId });

      res.status(200).json({
        data: chats,
        message: 'Chats retrived'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', passport.authenticate('jwt', { session: false }), validationHandler(createChatSchema), async function(req, res, next){
    const { body: chat } = req;

    try {
      const chatCreatedId = await chatService.createChat({ chat });  

      res.status(201).json({
        data: chatCreatedId,
        message: 'Chat created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:chatId', passport.authenticate('jwt', { session: false }), validationHandler({ chatId: chatIdSchema }, 'params'), async function(req, res, next) {
      const { chatId } = req.params;

      try {
        const deleteChatId = await chatService.deleteMessage({ chatId });

        res.status(200).json({
          data: deleteChatId,
          message: 'Chat deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = chatApi;