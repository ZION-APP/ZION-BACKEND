const { Fund } = require('../models');

class FundService {
  constructor() {
    this.table = Fund;
  }

  async getCatalogue() {
    const funds = await this.table.findAll({
      attributes: [
        ['id', 'value'],
        ['description', 'label'],
      ],
      where: {
        status: 'active',
      },
    });

    return funds;
  }
}

module.exports = FundService;
