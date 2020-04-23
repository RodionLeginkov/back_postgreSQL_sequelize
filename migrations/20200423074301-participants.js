'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('milestones', 'participants', {
        type: Sequelize.STRING(255),
      }),
    ],
  };

