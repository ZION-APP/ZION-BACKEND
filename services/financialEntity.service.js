const { FinancialEntity } = require('../models');

class FinancialEntityService {
  constructor() {
    this.table = FinancialEntity;
  }

  async getCatalogue() {
    const entities = await this.table.findAll({
      attributes: [
        ['id', 'value'],
        ['description', 'label'],
      ],
      where: {
        status: 'active',
      },
    });

    return entities;
  }
}

module.exports = FinancialEntityService;
