'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.removeColumn('milestones', 'rate'),
      queryInterface.removeColumn('milestones', 'rate_type'),
      queryInterface.removeColumn('milestones', 'platform'),
      queryInterface.removeColumn('milestones', 'withdraw'),  
    ],
  };
