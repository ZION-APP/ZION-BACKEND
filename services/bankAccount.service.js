const { BankAccount } = require('../models');

class BankAccountService {
  constructor() {
    this.table = BankAccount;
  }

  async createBankAccountByUser({ bank_account, user_id }) {
    const bankAccountCreated = await this.table.create({
      ...bank_account,
      user_id,
    });

    return bankAccountCreated.id ? bankAccountCreated : null;
  }

  async getBankAccountsByUser({ user_id }) {
    const bankAccounts = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        user_id: user_id,
        status: 'active',
      },
    });

    return bankAccounts;
  }

  async getBankAccountByUser({ user_id, bank_account_id }) {
    const bankAccount = await this.table.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: {
        id: bank_account_id,
        user_id: user_id,
        status: 'active',
      },
    });

    return bankAccount;
  }

  async updateBankAccountsByUser({ user_id, bank_account_id, bank_account }) {
    const bankAccountUpdated = await this.table.update(bank_account, {
      where: {
        id: bank_account_id,
        user_id: user_id,
        status: 'active',
      },
    });
    return bankAccountUpdated;
  }
}

module.exports = BankAccountService;
