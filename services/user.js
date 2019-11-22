const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ userName }) {
    const query = userName && { userName: userName };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async getUserById({ userId }) {
    
    const user = await this.mongoDB.get(this.collection, userId );
    return user;
  }

  async createUser({ user }) {
    const { name, userName, middleName, birthday, email, telephone, password, isAdmin } = user;
    const hashPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, 
      { userName, 
        name, 
        middleName, 
        birthday, 
        email, 
        telephone, 
        password: hashPassword, 
        isAdmin 
      });
    return createUserId;
  }

  async updateUser({ userId, user } = {}) {
    const updatedUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );
    return updatedUserId;
  }

  async deleteUser({ userId }) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

module.exports = UserService;