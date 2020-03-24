require('dotenv').load({path: process.env.DOTENV || '.test.env'});

const {models, sequelize} = require('../src/database');
const sinon = require('sinon');
const moment = require('moment');

module.exports = async function () {
    let clock = sinon.useFakeTimers(moment('2010-01-01').unix() * 1000);
    sequelize.options.logging = false;
    // sequelize.options.logging = console.log;
    await sequelize.drop({force: true});
    await sequelize.sync({force: true});
    clock.restore();
};
