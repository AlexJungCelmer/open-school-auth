const request = require('supertest');

const app = require('../app.js');

const user = {
    email: 'alex@gmail.com',
    password: '12345678',
    first_name: 'Alex',
    last_name: 'Celmer'
}
const teacherToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWFlZDkxNzExYzRmNjE5NjQxMjY0IiwiZW1haWwiOiJ0ZWFjaGVyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODY1Njg1NywiZXhwIjoxNzAwMjE0NDU3fQ.UvtJ6pEOEp9xo5PVPRDDSh0U4nBldfCeNVmgElc3D-Y'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NTk3ZDZjMzQ3NmRiNGMxN2NhYzVlIiwiZW1haWwiOiJhbGV4QGdtYWlsLmNvbSIsImlhdCI6MTY2ODY1Mjg3MywiZXhwIjoxNzAwMjEwNDczfQ.DLRTDf0VQlX7UGDenc0Ur2bp_umEuKTdW7nT7wN9unc';

let school = {
    name: 'Yete',
    email: 'contato@yete.com.br',
    inep: '123456789',
    has_medium_teaching: true,
    accept_terms: true,
}

schoolToExpect = {
    name: expect.any(String),
    email: expect.any(String),
    inep: expect.any(String),
    has_medium_teaching: expect.any(Boolean),
    accept_terms: expect.any(Boolean),
    __v: expect.any(Number), 
    _id: expect.any(Number), 
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date) 
}

describe('SCHOOL test', function () {
    it('POST create school', async function () {
        response = await request(app).post('/school').send(school).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('token', token)
            .expect(201)
        school = response.body
    })

    it('PUT update school', async function () {
        school.name = 'Yete edit'
        response = await request(app).put('/school/' + school._id).send(school).set('Accept', 'application/json')
            .set('token', token)
            .expect(204)
    })

    it('GET Array of schools', async function () {
        const response = await (request(app).get('/school/').set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('token', token)
            .expect(200))

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
    email: expect.any(String),
    inep: expect.any(String),
    has_medium_teaching: expect.any(Boolean),
    accept_terms: expect.any(Boolean),
    __v: expect.any(Number), 
    _id: expect.any(Number), 
    createdAt: expect.any(String),
    updatedAt: expect.any(String) 
                })
            ])
        )
    })

    it('GET by _id', async function () {
        const response = await request(app).get('/school/' + school._id).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('token', token)
            .expect(200)

        expect(response.body).toEqual(expect.objectContaining({
            name: expect.any(String),
    email: expect.any(String),
    inep: expect.any(String),
    has_medium_teaching: expect.any(Boolean),
    accept_terms: expect.any(Boolean),
    __v: expect.any(Number), 
    _id: expect.any(Number), 
    createdAt: expect.any(String),
    updatedAt: expect.any(String) 
        }))

    })

    it('DELETE school', async function () {
        console.log(school);
        request(app).delete('/school/' + school._id).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('token', token)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expect.objectContaining({
                    message: expect.any(String)
                }))
            })
    })
})