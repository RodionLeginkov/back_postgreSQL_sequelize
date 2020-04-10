'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.renameColumn('milestones', 'unit', 'rate_type')
  ],

    down: (queryInterface, Sequelize) => [
      queryInterface.renameColumn('milestones', 'rate_type', 'unit')
    ]
  };
  
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
