const request = require('supertest');
const app = require('../src/index.js');

describe('API PUT /cars/id', () => {
    test('No debería editar un carro inexistente', async () => {
        // Create a new car object
        const editedCarInfo = {
            "año": 2016,
            "color": "Rojo",
            "precio": 20000
        };
        const carId = 45; // Car id that does not exist
        // Send a GET request to the server
        const res = await request(app).put(`/cars/${carId}`).send(editedCarInfo);
        // Check the response and the car data
        expect(res.statusCode).toEqual(404);
        // Check the response and the cars data        
        expect(res.body).toEqual({ message: 'Car not found' });
    });
});