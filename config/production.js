module.exports = {
    pg: {
        logging: process.env.PG__LOGGING ? JSON.parse(process.env.PG__LOGGING) : false,
        uri: process.env.DATABASE_URL,
    },
    app: {
        port: process.env.PORT || 5000,
    },
};
