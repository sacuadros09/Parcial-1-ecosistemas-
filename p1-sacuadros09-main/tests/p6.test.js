const request = require('supertest');
const app = require('../src/index.js');

describe('API GET /cars/id', () => {
    test('Debería traer un carro específico de la lista', async () => {
        const car = {
            "id": 4,
            "marca": "BMW",
            "modelo": "X5",
            "año": 2023,
            "color": "Negro",
            "precio": 60000
        }
        // Send a GET request to the server
        const res = await request(app).get(`/cars/4`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(car);
    });
});
