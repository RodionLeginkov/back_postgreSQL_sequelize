// /* eslint-disable eol-last */
// const express = require('../../src/server');
// const supertest = require('supertest');
// const request = supertest(express);
// const should = require('should');
// const seedDB = require('../seed-db');

// describe('Tags', async () => {  
//     let saJwt;

//     before(async () => {
//         await seedDB();
//         /* eslint-disable eol-last */
//         console.info = () => {};
//         console.error = () => {};
//         // userMasterJwt = await testHelper.getJWT(seed.users.userMaster);
//         // user2MasterJwt = await testHelper.getJWT(seed.users.user2Master);
//         // userReseller2Jwt = await testHelper.getJWT(seed.users.userReseller2);
//         // saJwt = await testHelper.getJWT(seed.users.superadmin);
//     });

//     describe('must be properly created:', () => {
//         // it('escape symbols should be removed from tag name and is_public field should be "false" by default', async () => {
//         //     await request.post('/tag')
//         //         .set(`Authorization`, `Bearer ${saJwt}`)
//         //         .type('form')
//         //         .send(tags.tagWithEscapes)
//         //         .expect(200)
//         //         .then(async (response) => {
//         //             const tag = await models.Tag.findOne({'where': {tagId: response.body.tagId}});
//         //             tagData = tag.dataValues;
//         //             tagData.name.should.be.equal('tagwithescapes');
//         //             tagData.color.should.be.equal(tags.privateTag1.color.replace('#', ''));
//         //             tagData.isPublic.should.be.equal(false);
//         //         });
//         // });
        
//         it('can have same name as another user private tag', async () => {;
//             await request.get('/users')
//                 // .set(`Authorization`, `Bearer ${userMasterJwt}`)
//                 // .type('form')
//                 // .send(tags.tagWithEscapes)
//                 .expect(200);
//         });

//         it('but public tag should not be duplicated', async () => {
//             await request.post('/user')
//                 // .set(`Authorization`, `Bearer ${userMasterJwt}`)
//                 // .type('form')
//                 .send({})
//                 .expect(400)
//                 .then( res => console.log(res));
                            
//         });
//     });
// });