// DEBUG=app:* node scripts/seeders/seedKindOfPerson.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:financial_entities');
const { sequelize, Sequelize } = require('../../lib/mysql');
const KindOfPersonModel = require('../../models/kindOfPerson.model');

const kindOfPersons = [
  { description: 'NATURAL' },
  { description: 'JURIDICA' },
];


async function seedKindOfPersons() {
  try {
    const kindOfPerson = KindOfPersonModel(sequelize, Sequelize);
    await kindOfPerson.destroy({ truncate: true });


    // Inserta entidades en la tabla financial_entities
    const promisesKindOfPerson = kindOfPersons.map(async (kind) => {
      await kindOfPerson.create(kind);
    });

    await Promise.all(promisesKindOfPerson);

    debug(
      chalk.green(
        `${promisesKindOfPerson.length} Kind Of Persons have been created succesfully`
      )
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedKindOfPersons();
