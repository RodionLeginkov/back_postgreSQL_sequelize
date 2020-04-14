'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('users', 'totalLoad', {
        field: 'total_load',
        type: Sequelize.STRING(250)
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'totalLoad'
    );
  }
};
