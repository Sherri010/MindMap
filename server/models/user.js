'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    googleId: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
		  User.hasMany(models.Notebook, {
		 	foreignKey: 'UserId',
	      	onDelete: 'CASCADE',
		  });
      }
    }
  });
  return User;
};
