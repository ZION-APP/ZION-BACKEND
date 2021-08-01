const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../models');

class UserService {
  constructor() {
    this.table = User;
  }

  async getAll() {
    const users = await this.user.findAll();
    return users.length > 0 ? users: null;
  }

  async createUser({ user }) {
    const { firstname, lastname, username, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await this.table.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword
    });
    return userCreated.id? userCreated.id: null;
  }

  async getUserByUsernameOrEmail({ email }) {
    const user = await this.table.findOne({
      where: {
        [Op.or]: [{ username: email }, { email: email }],
        status: 'active'
      },
    });
    return user;
  }
}

module.exports = UserService;
