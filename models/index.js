const { sequelize, Sequelize } = require('../lib/mysql');

// Models
const UserModel = require('./user.model');
const ApiKeyModel = require('./apiKey.model');

// Instancias
const User = UserModel(sequelize, Sequelize);
const ApiKey = ApiKeyModel(sequelize, Sequelize);

// Descomentar si desea agregar los modelos en la base de datos
// sequelize.sync({ alter: true }).then(() => {
//   console.log('All models were synchronized successfully.');
// });

module.exports = {
  User,
  ApiKey,
};
