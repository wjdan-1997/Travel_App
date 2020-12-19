// REF:https://www.npmjs.com/package/supertest

const request = require('supertest');
const app = require ('../src/server/index')

import "babel-polyfill";

describe('Test the root path!',()=>{
test('It should get response with GET ', async()=>{
    try{
        const response = await request(app).get('/testApi');
        expect(response.statusCode).toEqual(200);
        
    }catch(error){
            expect(error).toMatch('error')
        }
})
})
 

// describe('GET', () =>{
//     it('responds with json',(done) =>{
//       request(app)
//         .get('/testApi')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });