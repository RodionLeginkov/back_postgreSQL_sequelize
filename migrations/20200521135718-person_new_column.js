'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('persons', 'rate', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('persons', 'rate_type', {
        type: Sequelize.STRING(15),
      }),
      queryInterface.addColumn('persons', 'platform', {
        type: Sequelize.STRING(64),
      }),
      queryInterface.addColumn('persons', 'withdraw', {
        type: Sequelize.STRING(64),
      }),
      queryInterface.addColumn('persons', 'load', {
        type: Sequelize.INTEGER,
      }),
  
    ],
  };
