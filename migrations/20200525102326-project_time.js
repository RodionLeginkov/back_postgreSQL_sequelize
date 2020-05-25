'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('projects', 'workStart', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('projects', 'workEnd', {
        type: Sequelize.DATE,
      })

  
    ],
  };
