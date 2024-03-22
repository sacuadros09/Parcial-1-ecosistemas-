const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?año=YYYY', () => {
    test('Debería traer los carros de un determinado año', async () => {
        const año = 2022;
        // Send a GET request to the server
        const res = await request(app).get(`/cars?año=${año}`).send();
        expect(res.statusCode).toEqual(200);
        res.body.forEach(car => {
            expect(car.año).toEqual(año);
        });
    });
});