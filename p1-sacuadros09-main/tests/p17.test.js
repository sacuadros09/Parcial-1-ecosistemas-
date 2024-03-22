const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?marca=XXX&modelo=YYY', () => {
    test('Debería traer los carros de una determinada marca y modelo', async () => {
        const marca = 'Honda';
        const modelo = 'Civic';
        // Send a GET request to the server
        const res = await request(app).get(`/cars?marca=${marca}&modelo=${modelo}`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].marca).toEqual('Honda');
        expect(res.body[0].modelo).toEqual('Civic');
    });
});