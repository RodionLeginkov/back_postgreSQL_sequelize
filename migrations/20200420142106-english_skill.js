'use strict';

  module.exports = {
    up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('users', 'english_skill', {
        type: Sequelize.STRING(64),
      })
  
    ],
    
    
  };

 
