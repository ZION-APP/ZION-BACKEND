// DEBUG=app:* node scripts/seeders/seedFunds.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:funds');
const { sequelize, Sequelize } = require('../../lib/mysql');
const FundModel = require('../../models/fund.model');

const funds = [
  { description: 'OMEGA' },
  { description: 'ALPHA' }
];


async function seedFunds() {
  try {
    const fundModel = FundModel(sequelize, Sequelize);
    await fundModel.destroy({ truncate: true });


    // Inserta entidades en la tabla financial_entities
    const promisesFunds = funds.map(async (fund) => {
      await fundModel.create(fund);
    });

    await Promise.all(promisesFunds);

    debug(
      chalk.green(
        `${promisesFunds.length} Funds have been created succesfully`
      )
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedFunds();
