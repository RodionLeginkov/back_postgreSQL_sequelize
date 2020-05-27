'use strict';
const crypto = require('crypto');
const uuid = require('uuid');
const user = require('../src/models/user');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      uuid: uuid(),
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'user@admin.com',
      password: crypto.createHmac('sha512', process.env.SALT).update('adminadmin').digest('hex'),
      role: 'ceo',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
