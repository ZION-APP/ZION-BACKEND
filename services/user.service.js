const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../models');

class UserService {
  constructor() {
    this.table = User;
  }

  async getAll() {
    const users = await this.table.findAll({
      attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'last_login', 'status']
    });
    return users;
  }

  async createUser({ user }) {
    const { firstname, lastname, username, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await this.table.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    return userCreated.id ? userCreated.id : null;
  }

  async getUserById({ id }) {
    const user = await this.table.findOne({
      attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'last_login', 'status'],
      where: {
        id: id,
        status: 'active',
      },
    });
    return user;
  }

  async getUserByUsernameOrEmail({ email }) {
    const user = await this.table.findOne({
      where: {
        [Op.or]: [{ username: email }, { email: email }],
        status: 'active',
      },
    });
    return user;
  }
}

module.exports = UserService;
