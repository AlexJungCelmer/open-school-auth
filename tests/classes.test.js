const request = require('supertest');

const app = require('../app.js');

const teacherToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWFlZDkxNzExYzRmNjE5NjQxMjY0IiwiZW1haWwiOiJ0ZWFjaGVyQGdtYWlsLmNvbSIsImlhdCI6MTY2ODY1Njg1NywiZXhwIjoxNzAwMjE0NDU3fQ.UvtJ6pEOEp9xo5PVPRDDSh0U4nBldfCeNVmgElc3D-Y'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NWIxNGU0MWQ5MWNmYzYxYzk3M2ZhIiwiZW1haWwiOiJhbGV4QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NDE3MDc2NywiZXhwIjoxNzA1NzI4MzY3fQ.UqSWeyyLI9tsonaQd2ulFY0qXLzBrve_2A6OCa30Ink';

let school = {
    name: 'Yete',
    email: 'contato@yete.com.br',
    inep: '123456789',
    has_medium_teaching: true,
    accept_terms: true,
}

let classe = {
    name: '1º A1',
    school: '',
    courses: []
}


describe('CLASSES test', function () {
    it('POST create school', async function () {
        response = await request(app).post('/school').send(school).set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .set('token', token)
            .expect(201)
        school = response.body
    })

    // it('POST create class', async function () {
    //     response = await request(app).post('/class').send(classe).set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .set('token', token)
    //         .expect(201)
    //     classe = response.body
    // })

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
