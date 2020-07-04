const request = require('supertest');
const app = require('../app');
const serverHandler = require('./helper/server-handler');
const Exercise = require('../models/exercise.model')

describe('Testing Exercise Routes',()=>{
    
    beforeAll(async ()=> {
       await serverHandler.connect()
       await Exercise.deleteMany({})
    })
    
    afterAll(serverHandler.disconnect)

    describe('It shoud response to a GET request/method',()=>{
        let response
        test('Expected Response Status to be 200', async()=>{
            response = await request(app).get('/exercises')
            expect(response.statusCode).toBe(200)
        })
        test('No Exercises Exist as collection purged', ()=>{
            expect(response.body).toEqual([])
        })
    })
    // using exerciseTestID to save ID of created Instance for other Request Testings
    let exerciseTestID
    describe('It shoud response to a POST request/method',()=>{
        
        test('POST-rqt: user creation expecting status:200 and user instance', async()=>{
            const response = await request(app).post('/exercises').send({
                username: 'user-test',
                description:'testing',
                duration:10,
                date: new Date()
            })
            
            exerciseTestID = response.body.exercise._id

            expect(response.statusCode).toBe(200)
            expect(response.body.exercise.username).toBe('user-test')
            expect(response.body.exercise._id).toBeTruthy
        }) 
        
        test('Duplicating POST request should fail under missing attribute date(validation)', async()=>{
            const response = await request(app).post('/exercises').send({
                username: 'user-test',
                description:'testing',
                duration:10,
            })
            expect(response.statusCode).toBe(400)
        }) 
    })

    describe('It shoud response to a GET request for "/exercises/:id" ',()=>{
            let response
        test('Expected Response Status to be 200', async()=>{
            response = await request(app).get('/exercises/' + exerciseTestID)
            expect(response.statusCode).toBe(200)
        })
        test('Using instance id from previos created test should return username:user-test', ()=>{
            expect(response.body.username).toBe('user-test')
        })
    })

    describe('It shoud response to a PUT request for "/exercises/:id" ',()=>{
        let response
        test('Expected Response Status to be 200 with proper info on body request', async()=>{
            response = await request(app).put('/exercises/' + exerciseTestID).send({
                username: 'new-user',
                description:'testing',
                duration:10,
                date: new Date()
            })

            expect(response.statusCode).toBe(200)
        })
        test('Username should be updated to new-user for exercise entry', ()=>{
            expect(response.body).toBe('Exercise updated')
        })

        test('Expected Error 400: missing attributes(validation)', async()=>{
            const response = await request(app).put('/exercises/' + exerciseTestID).send({})
            expect(response.statusCode).toBe(400)
        })
    })

    describe('It shoud response to a DELETE request for "/exercises/:id" ',()=>{
            
        test('Expected Status 200: document succesfully deleted ', async()=>{
            const response = await request(app).delete('/exercises/' + exerciseTestID)
            expect(response.statusCode).toBe(200)
            expect(response.body).toBe('Exercise deleted')
        })

        test('Expected Status 400: error trying to delete non-existent document', async()=>{
            const response = await request(app).delete('/exercises/' + exerciseTestID)
            expect(response.statusCode).toBe(400)
        })

    })
    
})
