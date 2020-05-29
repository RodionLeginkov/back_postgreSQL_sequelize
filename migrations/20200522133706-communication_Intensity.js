'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('projects', 'communicationIntensity', {
        type: Sequelize.STRING(30),
      })
    ],
  };
