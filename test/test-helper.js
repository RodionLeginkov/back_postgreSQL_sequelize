const express = require('../src/server');
const supertest = require('supertest');
const request = supertest(express);

module.exports = {
    /**
     * shortened authorization
     * @param user
     */
    async getJWT (user) {
        return await request.post('/signin')
            .send(`email=${user.email}`)
            .send(`password=${user.password}`)
            .then(async (result) => {
                return result.body;
            });
    },

    async cleanTable (modelName) {
        await models[modelName].destroy({where: {},
            force: true});
    },
};