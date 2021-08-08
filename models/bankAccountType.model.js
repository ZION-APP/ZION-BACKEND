module.exports = (sequelize, Sequelize) => {
  const BankAccountType = sequelize.define('bank_account_type', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  });

  return BankAccountType;
};
