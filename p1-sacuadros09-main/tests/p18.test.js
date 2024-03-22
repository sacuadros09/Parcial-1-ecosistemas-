const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?modelo=XXX', () => {
    test('Debería traer los carros de una determinado modelo', async () => {
        const modelo = 'X5';
        // Send a GET request to the server
        const res = await request(app).get(`/cars?modelo=${modelo}`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].modelo).toEqual('X5');
    });
});