'use strict';

module.exports = function(sequelize, DataTypes) {
  var Notebook = sequelize.define('Notebook', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    introduction: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
		  Notebook.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Notebook;
};
