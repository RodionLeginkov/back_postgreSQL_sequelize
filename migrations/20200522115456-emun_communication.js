'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('projects', 'communicationType', {
        type: Sequelize.ENUM('Text', 'Voice calls', 'Video Calls'),
      })
    ],
  };
