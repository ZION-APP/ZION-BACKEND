const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../models');

class UserService {
  constructor() {
    this.table = User;
  }

  async getAll() {
    const users = await this.table.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    return users;
  }

  async createUser({ user }) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await this.table.create({
      ...user,
      password: hashedPassword,
    });
    return userCreated.id ? userCreated.id : null;
  }

  async getUserById({ id }) {
    const user = await this.table.findOne({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
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

  async getUserByUsername({ username }) {
    const user = await this.table.findOne({
      where: {
        username: username,
        status: 'active',
      },
    });
    return user;
  }

  async getUserByEmail({ email }) {
    const user = await this.table.findOne({
      where: {
        email: email,
        status: 'active',
      },
    });
    return user;
  }

  async getUserByIdentityNumber({ identity_number }) {
    const user = await this.table.findOne({
      where: {
        identity_number: identity_number,
        status: 'active',
      },
    });
    return user;
  }

  async updateUserById({ user, id }) {
    const userUpdated = await this.table.update(
      { ...user },
      {
        where: {
          id: id,
        },
      }
    );
    return userUpdated;
  }
}

module.exports = UserService;
