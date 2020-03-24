/* eslint-disable eol-last */
const express = require('../../src/server');
const supertest = require('supertest');
const request = supertest(express);
const signIn = require('../test-helper')
const seedDB = require('../seed-db');
var assert = require('assert');

describe('/v1/user', async () => {  
    let saJwt;
    const  user = {
        firstName: 'Nick',
        lastName: 'Mih',
        isActive: true,
        email: 'nikmih@mail.ru',
        password: 'HelloWorld!'
    }
    
    const emptyUser = {}
    const wrongUser = {
        firstName: 3123,
        lastName: true,
        isActive: "dsa"
    }

    before(async () => {
        await seedDB();
        console.info = () => {};
        console.error = () => {};
    });


    describe('POST /v1/users', () => {

        describe('post new user', () => {
            it('should be object ( response status 200)', async () => {
                await request.post('/v1/user')
                    .send(user)
                    .expect(200)
                    .expect('content-type','application/json; charset=utf-8');
            });
        });
        describe('post empty user', () => {
            it('should be error', async () => {
                await request.post('/v1/user').
                send(emptyUser)
                .expect(400)
            })
        })
        describe('post invalid user ( wrong type fields)', () => {
            it('should be error', async () => {
                await request.post('/v1/user').
                send(wrongUser)
                    .expect( res => {
                        console.log(res.body.error)
                        if(res.body.error.message !== `invalid input syntax for type boolean: "${wrongUser.isActive}"`) throw new Error('should be invalid input syntax')
                    })
                    .expect(500)
            })
        })
    })


    describe('GET /v1/users' , async () => {
        let newUser ;
        before( async () => {
            newUser = await signIn.getJWT(user)
            saJwt = await newUser.token.accessToken
        });

        describe('Get all users without valid headers',  () => {
            it('should be error Forbidden (responce status 403)', async () => {
                await request.get('/v1/users')
                .expect(403)
            })

            it('should JWTerror', async () => {
                await request.get('/v1/users')
                .set('authorization', 'dsa')
                .expect(200)
                .then( res => {
                    assert.equal(res.body.name,'JsonWebTokenError')
                })
            })
        })

        describe('valid header', async () => {         
            it('should be array (response status 200)', async () => {
                await request.get('/v1/users')
                .set('authorization', saJwt)
                .expect(200)
                .then((res) => {
                    assert.equal(res.body[0].fullName,'undefined undefined undefined')
                })
            });
        });

    })
    

});