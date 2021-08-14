const { sequelize, Sequelize } = require('../lib/mysql');

// Models
const UserModel = require('./user.model');
const ApiKeyModel = require('./apiKey.model');
const GoalModel = require('./goal.model');
const FinancialEntityModel = require('./financialEntity.model');
const BankAccountModel = require('./bankAccount.model');
const BankAccountTypeModel = require('./bankAccountType.model');
const FormJuridicoModel = require('./formJuridico.model');

// Instancias
const User = UserModel(sequelize, Sequelize);
const ApiKey = ApiKeyModel(sequelize, Sequelize);
const Goal = GoalModel(sequelize, Sequelize);
const FinancialEntity = FinancialEntityModel(sequelize, Sequelize);
const BankAccount = BankAccountModel(sequelize, Sequelize);
const BankAccountType = BankAccountTypeModel(sequelize, Sequelize);
const FormJuridico = FormJuridicoModel(sequelize, Sequelize);

/** 
 *    Descomentar si desea actualizar los modelos en la base de datos y luego volver a comentarlo 
*/
// sequelize.sync({ alter: true }).then(() => {
//   console.log('All models were synchronized successfully.');
// });

// ASOCIACIONES
/*  Una meta tiene un usuario asociado y un usuario puede tener muchas metas */
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

/*  Una cuenta bancaria le pertenece a un usuario y tiene asociada una entidad financiera y un tipo de cuenta bancaria */
User.hasMany(BankAccount, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
FinancialEntity.hasMany(BankAccount, {
  foreignKey: {
    name: 'financial_entity_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
BankAccountType.hasMany(BankAccount, {
  foreignKey: {
    name: 'bank_account_type_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
BankAccount.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
  },
});
BankAccount.belongsTo(FinancialEntity, {
  as: 'financial_entity',
  foreignKey: {
    name: 'financial_entity_id',
  },
});
BankAccount.belongsTo(BankAccountType, {
  as: 'bank_account_type',
  foreignKey: {
    name: 'bank_account_type_id',
  },
});

/* Un FormJuridico le pertenece a un usuario */
User.hasOne(FormJuridico, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
FormJuridico.belongsTo(User, {
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
  FormJuridico
};
