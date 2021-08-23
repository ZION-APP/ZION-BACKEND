const { sequelize, Sequelize } = require('../lib/mysql');

// Models
const UserModel = require('./user.model');
const ApiKeyModel = require('./apiKey.model');
const GoalModel = require('./goal.model');
const InvestmentFundModel = require('./investmentFund.model');
const FundModel = require('./fund.model');
const FinancialEntityModel = require('./financialEntity.model');
const BankAccountModel = require('./bankAccount.model');
const BankAccountTypeModel = require('./bankAccountType.model');
const FormModel = require('./form.model');
const NotificationModel = require('./notification.model'); 
const KindOfPersonModel = require('./kindOfPerson.model'); 

// Instancias
const User = UserModel(sequelize, Sequelize);
const ApiKey = ApiKeyModel(sequelize, Sequelize);
const Goal = GoalModel(sequelize, Sequelize);
const InvestmentFund = InvestmentFundModel(sequelize, Sequelize);
const Fund = FundModel(sequelize, Sequelize);
const FinancialEntity = FinancialEntityModel(sequelize, Sequelize);
const BankAccount = BankAccountModel(sequelize, Sequelize);
const BankAccountType = BankAccountTypeModel(sequelize, Sequelize);
const Form = FormModel(sequelize, Sequelize);
const Notification = NotificationModel(sequelize, Sequelize);
const KindOfPerson = KindOfPersonModel(sequelize, Sequelize);

/** 
 *    Descomentar si desea actualizar los modelos en la base de datos y luego volver a comentarlo 
*/

//  sequelize.sync({ alter: true }).then(() => {
//    console.log('All models were synchronized successfully.');
//  });
 
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

/*  Un fondo de inversion tiene un usuario asociado y un usuario puede tener muchos fondos de inversion */
User.hasMany(InvestmentFund, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
InvestmentFund.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
  },
});

/*  Un fondo de inversion tiene una meta asociado y un meta le pertenece a un fondo de inversion */
Goal.hasOne(InvestmentFund, {
  foreignKey: {
    name: 'goal_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
InvestmentFund.belongsTo(Goal, {
  as: 'goal',
  foreignKey: {
    name: 'goal_id',
  },
});

/*  Una meta tiene un fondo asociado y un fondo puede estar en muchas metas */
Fund.hasMany(Goal, {
  foreignKey: {
    name: 'fund_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
Goal.belongsTo(Fund, {
  as: 'fund',
  foreignKey: {
    name: 'fund_id',
  },
});


/*  Un fondo de inversion tiene un fondo asociado y un fondo puede estar en muchos fondos de inversion*/
Fund.hasMany(InvestmentFund, {
  foreignKey: {
    name: 'fund_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
InvestmentFund.belongsTo(Fund, {
  as: 'fund',
  foreignKey: {
    name: 'fund_id',
  },
});

/*  Un fondo de inversion tiene una cuenta bancaria asociada y una cuenta bancaria puede estar en muchos fondos de inversion*/
BankAccount.hasMany(InvestmentFund, {
  foreignKey: {
    name: 'bank_account_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
InvestmentFund.belongsTo(BankAccount, {
  as: 'bank_account',
  foreignKey: {
    name: 'bank_account_id',
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

/* Un Form le pertenece a un usuario */
User.hasOne(Form, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
Form.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
  },
});

/* Un usuario tiene multiples notificaciones */
User.hasMany(Notification, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
Notification.belongsTo(User, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
  },
});

/* Un usuario tiene un tipo de persona y un formulario tambien */
KindOfPerson.hasMany(User, {
  foreignKey: {
    name: 'kind_of_person_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
User.belongsTo(KindOfPerson, {
  as: 'kind_of_person',
  foreignKey: {
    name: 'kind_of_person_id',
  },
});

KindOfPerson.hasMany(Form, {
  foreignKey: {
    name: 'kind_of_person_id',
    allowNull: false,
  },
  onDelete: 'NO ACTION',
});
Form.belongsTo(KindOfPerson, {
  as: 'kind_of_person',
  foreignKey: {
    name: 'kind_of_person_id',
  },
});

module.exports = {
  User,
  KindOfPerson,
  ApiKey,
  Goal,
  Fund,
  InvestmentFund,
  FinancialEntity,
  BankAccount,
  BankAccountType,
  Form,
  Notification
};
