// DEBUG=app:* node scripts/seeders/seedFinancialEntitys.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:financial_entities');
const { sequelize, Sequelize } = require('../../lib/mysql');
const FinancialEntityModel = require('../../models/financialEntity.model');

const entities = [
  { description: 'BANCO DEL PACIFICO' },
  { description: 'BANCO PICHINCHA' },
  { description: 'BANCO DE GUAYAQUIL' },
  { description: 'BANCO BOLIVARIANO' },
  { description: 'PRODUBANCO' },
];


async function seedFinancialEntitys() {
  try {
    const financialEntity = FinancialEntityModel(sequelize, Sequelize);
    await financialEntity.destroy({ truncate: true });


    // Inserta entidades en la tabla financial_entities
    const promisesEntity = entities.map(async (entity) => {
      await financialEntity.create(entity);
    });

    await Promise.all(promisesEntity);

    debug(
      chalk.green(
        `${promisesEntity.length} Financial Entities have been created succesfully`
      )
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedFinancialEntitys();
