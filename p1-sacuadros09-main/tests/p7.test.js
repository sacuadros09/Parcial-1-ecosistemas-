const request = require('supertest');
const app = require('../src/index.js');

describe('API GET /cars/id', () => {
    test('No debería traer un carro basado en un id inexistente', async () => {
        // Send a GET request to the server
        const res = await request(app).get(`/cars/45`).send(); // 
        // Check the response and the car data
        expect(res.statusCode).toEqual(404); // Not Found http status code 404
        // Check the response and the cars data
        expect(res.body).toEqual({ message: 'Car not found' });
    });
});
