const cron = require('node-cron');
const axios = require('axios');
module.exports = () => {
    cron.schedule(' */10 8-23 * * 0-7', async () => {
        try {
          await axios.get(`${process.env.PING_FRONTEND_URL}`);
          await axios.get(`${process.env.PING_BACKEND_URL}`);
        } catch (err) {
          console.log('Error');
        }
    }, {
        scheduled: true,
        timezone: 'Europe/Moscow'
    });
};
