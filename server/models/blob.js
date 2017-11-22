'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blob = sequelize.define('Blob', {
    name: DataTypes.STRING,
    age: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Blob;
};