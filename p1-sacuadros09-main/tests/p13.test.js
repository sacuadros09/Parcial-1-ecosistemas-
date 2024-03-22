const request = require('supertest');
const app = require('../src/index.js');

describe('API DELETE /cars/id', () => {
    test('Debería eliminar un carro recién agregado', async () => {
        // Create a new car object
        const car = {
            "marca": "Kia",
            "modelo": "Picanto",
            "año": 2015,
            "color": "Blanco",
            "precio": 21000
        };        
        // Send the car object to the server
        const resTemp = await request(app).post('/cars').send(car);
        const carId = resTemp.body.id;
        // Send a GET request to the server
        const res = await request(app).delete(`/cars/${carId}`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'car deleted' });
    });
});