const request = require('supertest');
const app = require('../src/index.js');

describe('API PUT /cars/id', () => {
    test('No debería editar el id de un carro', async () => {
        // Create a new car object
        const editedCarInfo = {
            "id": 6, // Car id that exist but should not be edited
            "año": 2016,
            "color": "Rojo",
            "precio": 20000
        };
        const carId = 5; // Car id that does not exist
        // Send a GET request to the server
        const res = await request(app).put(`/cars/${carId}`).send(editedCarInfo);
        // Check the response and the car data
        expect(res.statusCode).toEqual(400);
        // Check the response and the cars data
        expect(res.body).toEqual({ message: 'bad request' });
    });
});