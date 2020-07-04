const request = require('supertest');
const app = require('../app');
const serverHandler = require('./helper/server-handler');
const User = require('../models/user.model')

describe('Testing User Routes',()=>{
    
    beforeAll(async ()=> {
       await serverHandler.connect()
       await User.deleteMany({})
    })
    
    afterAll(serverHandler.disconnect)

    describe('It shoud response to a GET request/method',()=>{
        let response
        test('Expected Response Status to be 200', async()=>{
            response = await request(app).get('/users')
            expect(response.statusCode).toBe(200)
        })
        test('No Users Exist as collection purged', ()=>{
            expect(response.body).toEqual([])
        })

    })
    
    describe('It shoud response to a POST request/method',()=>{
        
        test('POST-rqt: user creation expecting status:200 and user instance', async()=>{
            const response = await request(app).post('/users').send({
                username: 'user-test'
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.user.username).toBe('user-test')
            expect(response.body.user._id).toBeTruthy
        }) 
        
        test('Duplicating POST request should fail under validation', async()=>{
            const response = await request(app).post('/users').send({
                username: 'user-test'
            })
            expect(response.statusCode).toBe(400)
        }) 
    })
})