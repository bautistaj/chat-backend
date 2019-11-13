const joi = require('@hapi/joi');
const { chatIdSchema } = require('./chat');
const { userIdSchema } = require('./user');

const messageIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);
const messageSchema = joi.string().max(240);
const dateSchema = joi.date();

const createMessageSchema = {
  chatId: chatIdSchema.required(),
  userId: userIdSchema.required(),
  date: dateSchema.required(),
  message: messageSchema.required(),
};

const updateMessageSchema = {
  chatId: chatIdSchema.required(),
  userId: userIdSchema.required(),
  date: dateSchema.required(),
  message: messageSchema.required(),
};

module.exports = {
  messageIdSchema,
  createMessageSchema,
  updateMessageSchema
}