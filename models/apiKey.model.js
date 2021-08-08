module.exports = function (sequelize, Sequelize) {
  const ApiKey = sequelize.define('api_key', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    scope: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  });

  return ApiKey;
};
