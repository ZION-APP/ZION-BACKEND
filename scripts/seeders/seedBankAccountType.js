// DEBUG=app:* node scripts/seeders/seedBankAccountType.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:bank_account_type');
const { sequelize, Sequelize } = require('../../lib/mysql');
const BankAccountTypeModel = require('../../models/bankAccountType.model');

const bankAccountTypes = [
  { description: 'AHORROS' },
  { description: 'CORRIENTE' },
];

async function seedBankAccountType() {
  try {
    const bankAccountType = BankAccountTypeModel(sequelize, Sequelize);
    await bankAccountType.destroy({ truncate: true });

    // Inserta entidades en la tabla bank_account_type
    const promisesBankAccountType = bankAccountTypes.map(async (type) => {
      await bankAccountType.create(type);
    });

    await Promise.all(promisesBankAccountType);

    debug(
      chalk.green(
        `${promisesBankAccountType.length} bank account types have been created succesfully`
      )
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedBankAccountType();
