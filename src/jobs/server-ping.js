const cron = require('node-cron');
const axios = require('axios');
module.exports = () => {
    cron.schedule('*/8 8-23 * * *', async() => {
      try {
        await axios.get(`${process.env.PING_BACKEND_URL}`);
       } catch (err) {
         console.log('Error back');
       }
       try {
        await axios.get(`${process.env.PING_FRONTEND_URL}`);
       } catch (err) {
        console.log('Error front');
       }
    }, {
        scheduled: true,
        timezone: 'Europe/Moscow'
    });
};
