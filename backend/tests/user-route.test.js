const request = require('supertest');
const app = require('../app');
const serverHandler = require('./server-handler')

describe('Testing User Routes',()=>{
    
    beforeAll(serverHandler.connect)
    afterAll(serverHandler.disconnect)

    test('It shoud response to a GET request/method', async()=>{
        const response = await request(app).get('/users')
        expect(response.statusCode).toBe(200)
    })

    test('It shoud response to a POST request/method', async()=>{
        const response = await request(app).get('/users')
        expect(response.statusCode).toBe(200)
    }) 
})