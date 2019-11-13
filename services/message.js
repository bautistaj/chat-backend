const MongoLib = require('../lib/mongo');

class MessageService {
  constructor() {
    this.collection = 'messages';
    this.mongoDB = new MongoLib();
  }

  async getMessages({ chatId }) {
    const query = chatId && { chatId: chatId };
    const messages = await this.mongoDB.getAll(this.collection, query);
    return messages || [];
  }

  async getMessage({ messageId }) {
    const message = await this.mongoDB.get(this.collection, messageId);
    return message || {};
  }

  async createMessage({ message }) {
    const createMessageId = await this.mongoDB.create(this.collection, message);
    return createMessageId;
  }

  async updateMessage({ messageId, message } = {}) {
    const updatedMessageId = await this.mongoDB.update(
      this.collection,
      messageId,
      message
    );
    return updatedMessageId;
  }

  async deleteMessage({ messageId }) {
    const deletedMessageId = await this.mongoDB.delete(this.collection, messageId);
    return deletedMessageId;
  }
}

module.exports = MessageService;