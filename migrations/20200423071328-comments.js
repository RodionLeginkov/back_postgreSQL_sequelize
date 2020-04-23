'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('milestones', 'comment', {
        type: Sequelize.STRING(255),
      }),
    ],
  };
