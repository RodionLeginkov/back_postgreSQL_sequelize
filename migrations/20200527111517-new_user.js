'use strict';
const uuid = require('uuid');
const db = require('../src/database').models;

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      uuid: uuid(),
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'user@user.com',
      password: db.User.hashPassword('adminadmin'),
      role: 'ceo',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
