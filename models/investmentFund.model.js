module.exports = function (sequelize, Sequelize) {
  const InvestmentFund = sequelize.define('investment_fund', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    init_amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
      },
    },
    target_amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
      },
    },
    montly_amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
      },
      defaultValue: 3
    },
    current_amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
      },
      defaultValue: 0,
    },
    target_date: {
      type: Sequelize.DATE,
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

  return InvestmentFund;
};
