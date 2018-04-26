'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
	  queryInterface.addColumn(
       'Notebooks',
       'UserId',
       Sequelize.INTEGER
     );
  },

  down: function (queryInterface, Sequelize) {
	  queryInterface.removeColumn(
	  	'Notebooks',
      	'UserId'
     );
  }
};
