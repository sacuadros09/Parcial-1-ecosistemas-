const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?marca=XXX', () => {
    test('Debería traer los carros de una determinada marca', async () => {
        const marca = 'Toyota';
        // Send a GET request to the server
        const res = await request(app).get(`/cars?marca=${marca}`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([
            {
                "id": 1,
                "marca": "Toyota",
                "modelo": "Corolla",
                "año": 2022,
                "color": "Blanco",
                "precio": 25000
            }
        ]);
    });
});