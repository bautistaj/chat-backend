const joi = require('@hapi/joi');

const chatIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

const createChatSchema = {
  users: joi.array().items(),
};

module.exports = {
  createChatSchema,
  chatIdSchema
}