const { BankAccountType } = require('../models');

class BankAccountTypeService {
  constructor() {
    this.table = BankAccountType;
  }

  async getCatalogue() {
    const bankAccountTypes = await this.table.findAll({
      attributes: [
        ['id', 'value'],
        ['description', 'label'],
      ],
      where: {
        status: 'active',
      },
    });

    return bankAccountTypes;
  }
}

module.exports = BankAccountTypeService;
