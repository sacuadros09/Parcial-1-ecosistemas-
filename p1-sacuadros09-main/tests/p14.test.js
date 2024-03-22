const request = require('supertest');
const app = require('../src/index.js');

describe('API DELETE /cars/id', () => {
    test('Debería eliminar un carro existente', async () => {        
        const carId = 1;
        // Send a GET request to the server
        const res = await request(app).delete(`/cars/${carId}`).send();
        expect(res.statusCode).toEqual(200); // delete http status code is 204
        expect(res.body).toEqual({ message: 'car deleted' });
    });
});