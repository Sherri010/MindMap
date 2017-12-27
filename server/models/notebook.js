'use strict';

module.exports = function(sequelize, DataTypes) {
  var Notebook = sequelize.define('Notebook', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    introduction: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Notebook;
};
