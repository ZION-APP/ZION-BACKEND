module.exports = (sequelize, Sequelize) => {
    const KindOfPerson = sequelize.define('kind_of_person', {
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
  
    return KindOfPerson;
  };
  