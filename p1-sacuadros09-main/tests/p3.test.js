const request = require('supertest');
const app = require('../src/index.js');

describe('API GET /cars', () => {
    test('debería traer todos los carros', async () => {
        // Send a GET request to the server
        const res = await request(app).get('/cars').send();
        // Check the response and the car data
        expect(res.statusCode).toEqual(200); // OK http status code 200
        // Check the response and the cars data
        expect(res.body.length).toEqual(15);
    });
});
