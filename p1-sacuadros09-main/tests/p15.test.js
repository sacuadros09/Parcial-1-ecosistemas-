const request = require('supertest');
const app = require('../src/index.js');

describe('API DELETE /cars/id', () => {
    test('No debería eliminar un carro no existente', async () => {        
        const carId = 120;
        // Send a GET request to the server
        const res = await request(app).delete(`/cars/${carId}`).send();
        expect(res.statusCode).toEqual(404); // delete http status code is 204
        expect(res.body).toEqual({ message: 'Car not found' });
    });
});