const { InvestmentFund } = require('../models');

class InvestmentFundService {
  constructor() {
    this.table = InvestmentFund;
  }

  async getAllInvestmentFund() {
    const iFunds = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        status: 'active',
      },
    });
    return iFunds;
  }

  async getInvestmentFundsByUser({ user_id }) {
    const iFunds = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        user_id: user_id,
        status: 'active',
      },
    });

    return iFunds;
  }

  async getInvestmentFundByUser({ user_id, iFund_id }) {
    const iFund = await this.table.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: {
        id: iFund_id,
        user_id: user_id,
        status: 'active',
      },
    });

    return iFund;
  }

  async createInvestmentFundByUser({ iFund, user_id }) {
    const iFundCreated = await this.table.create({
      ...iFund,
      user_id,
    });
    return iFundCreated.id ? iFundCreated : null;
  }

  async updateInvestmentFundByUser({ iFund, iFund_id, user_id }) {
    const iFundUpdated = await this.table.update(iFund, {
      where: {
        id: iFund_id,
        user_id: user_id,
        status: 'active',
      },
    });
    return iFundUpdated;
  }
}


module.exports = InvestmentFundService;
