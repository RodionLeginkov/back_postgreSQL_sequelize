'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('projects', 'communicationType', {
      type: Sequelize.STRING(30),
    });
}
};
