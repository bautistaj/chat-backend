const MongoLib = require('../lib/mongo');

class ChatService {
  constructor() {
    this.collection = 'chats';
    this.mongoDB = new MongoLib();
  }

  async getChats({ users }) {
    const query = users && { users: { $all: users.split(',') }};
    const chats = await this.mongoDB.getAll(this.collection, query);
    return chats || [];
  }

  async createChat({ chat }) {
    const createChatId = await this.mongoDB.create(this.collection, chat);
    return createChatId;
  }

  async deleteChat({ chatId }) {
    const deletedChatId = await this.mongoDB.delete(this.collection, chatId);
    return deletedChatId;
  }
}

module.exports = ChatService;