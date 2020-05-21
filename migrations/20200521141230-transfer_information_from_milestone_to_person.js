'use strict';
module.exports = {
    up: (queryInterface) => queryInterface.sequelize.query(`
    BEGIN;
    UPDATE persons p
    set rate = m.rate, rate_type=m.rate_type, platform = m.platform, withdraw = m.withdraw, load = m.load
        FROM milestones m
    where p.uuid = m.person_uuid and m.rate > 0;
    COMMIT;
    `),
    down: (queryInterface, Sequelize) => {}
};
