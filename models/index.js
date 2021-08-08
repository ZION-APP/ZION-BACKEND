const { sequelize, Sequelize } = require('../lib/mysql');

// Models
const UserModel = require('./user.model');
const ApiKeyModel = require('./apiKey.model');
const GoalModel = require('./goal.model');
const FinancialEntityModel = require('./financialEntity.model');
const BankAccountModel = require('./bankAccount.model');
const BankAccountTypeModel = require('./bankAccountType.model');

// Instancias
const User = UserModel(sequelize, Sequelize);
const ApiKey = ApiKeyModel(sequelize, Sequelize);
const Goal = GoalModel(sequelize, Sequelize);
const FinancialEntity = FinancialEntityModel(sequelize, Sequelize);
const BankAccount = BankAccountModel(sequelize, Sequelize);
const BankAccountType = BankAccountTypeModel(sequelize, Sequelize);

// Descomentar si desea agregar los modelos en la base de datos
// sequelize.sync({ alter: true }).then(() => {
//   console.log('All models were synchronized successfully.');
// });

// Asociaciones
User.hasMany(Goal, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
Goal.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
  },
});

module.exports = {
  User,
  ApiKey,
  Goal,
  FinancialEntity,
  BankAccount,
  BankAccountType,
};
