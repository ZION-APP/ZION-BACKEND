const Sequelize = require('sequelize').Sequelize;
const { config } = require('../config');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    dialect: 'mysql',
    host: config.dbHost,
    port: config.dbPort,
  }
);

async function dbConection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  dbConection,
  Sequelize,
};
