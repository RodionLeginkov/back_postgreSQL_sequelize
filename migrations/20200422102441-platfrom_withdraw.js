'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('milestones', 'platform', {
        type: Sequelize.STRING(64),
      }),
      queryInterface.addColumn('milestones', 'withdraw', {
        type: Sequelize.STRING(64),
      })
  
    ],
  };

 
