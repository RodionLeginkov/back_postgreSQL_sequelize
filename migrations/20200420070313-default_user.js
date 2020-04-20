'use strict';
const uuid = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      uuid: uuid(),
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'admin@admin.com',
      password: '1f6959a90ad4ffc8b790c91e971cc79bcf4c476c4cc563fe09cfc0e8f9ede24c018a39611e03eb8e947ab264bf2d85ea512a300bab79dbd60b7c1aa27d331bef',
      role: 'ceo',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
