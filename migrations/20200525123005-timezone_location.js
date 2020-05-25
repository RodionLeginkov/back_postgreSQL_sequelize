'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('projects', 'timezone', {
        type: Sequelize.STRING(50),
      }),
      queryInterface.addColumn('projects', 'location', {
        type: Sequelize.STRING(30),
      })

  
    ],
  };
