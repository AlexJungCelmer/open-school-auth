const request = require('supertest');

const app = require('../app.js');

const user = {
    email: 'alex@gmail.com',
    password: '12345678',
    first_name: 'Alex',
    last_name: 'Celmer'
}
const teacherToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWFlZDkxNzExYzRmNjE5NjQxMjY0IiwiZW1haWwiOiJ0ZWFjaGVyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODY1Njg1NywiZXhwIjoxNzAwMjE0NDU3fQ.UvtJ6pEOEp9xo5PVPRDDSh0U4nBldfCeNVmgElc3D-Y'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWIxNGU0MWQ5MWNmYzYxYzk3M2ZhIiwiZW1haWwiOiJhbGV4QGdtYWlsLmNvbSIsImlhdCI6MTY2ODY1NzQ4NiwiZXhwIjoxNzAwMjE1MDg2fQ.U726xl83qdfjHVjI7zCzn6oWnFoSpyK6dq96JQU-T9w';

describe('USER test', function () {
    it('POST Login', function (done) {
        request(app).post('/user/login').send(user).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('GET No token 403', function(done) {
        request(app).get('/user').set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403, done)
    })

    it('GET Invalid token 401', function(done) {
        request(app).get('/user').set('Accept', 'application/json')
            .set('token', token+'dsadas')
            .expect('Content-Type', /json/)
            .expect(401, done)
    })

    it('GET user personal info 200', function (done) {
        request(app).get('/user').set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})