const { ApiKey } = require('../models');

class ApiKeyService {
  constructor() {
    this.table = ApiKey;
  }

  async getScopes({ token }) {
    const apikeys = await this.table.findAll({
      attributes: ['scope'],
      where: {
        token: token,
        status: 'active',
      },
    });
    return apikeys.length > 0? apikeys.map(item => item = item.scope): null;
  }

  async createApiKey({ token, scope }) {
    const apiKey = await ApiKey.create({ token: token, scope: scope });
    return apiKey.id;
  }
}

module.exports = ApiKeyService;
