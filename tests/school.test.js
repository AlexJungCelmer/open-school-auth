const request = require('supertest');

const app = require('../app.js');

const user = {
    email: 'alex@gmail.com',
    password: '12345678',
    first_name: 'Alex',
    last_name: 'Celmer'
}
const teacherToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWFlZDkxNzExYzRmNjE5NjQxMjY0IiwiZW1haWwiOiJ0ZWFjaGVyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODY1Njg1NywiZXhwIjoxNzAwMjE0NDU3fQ.UvtJ6pEOEp9xo5PVPRDDSh0U4nBldfCeNVmgElc3D-Y'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWIxNGU0MWQ5MWNmYzYxYzk3M2ZhIiwiZW1haWwiOiJhbGV4QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NDE3MDc2NywiZXhwIjoxNzA1NzI4MzY3fQ.UqSWeyyLI9tsonaQd2ulFY0qXLzBrve_2A6OCa30Ink';

let school = {
    name: 'Yete',
    email: 'contato@yete.com.br',
    inep: '123456789',
    has_medium_teaching: true,
    accept_terms: true,
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

    it('POST create school 401', async function () {
        response = await request(app).post('/school').send(school).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('token', teacherToken)
            .expect(401)
    })

    it('PUT update school 401', async function () {
        school.name = 'Yete edit'
        response = await request(app).put('/school/' + school._id).send(school).set('Accept', 'application/json')
            .set('token', teacherToken)
            .expect(401)
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
                    inep: expect.any(Number),
                    has_medium_teaching: expect.any(Boolean),
                    accept_terms: expect.any(Boolean),
                    __v: expect.any(Number),
                    _id: expect.any(String),
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
            inep: expect.any(Number),
            has_medium_teaching: expect.any(Boolean),
            accept_terms: expect.any(Boolean),
            __v: expect.any(Number), 
            _id: expect.any(String), 
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