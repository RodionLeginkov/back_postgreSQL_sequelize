'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('users', 'invited', {
        type: Sequelize.BOOLEAN,
      }),
    ],
  };
