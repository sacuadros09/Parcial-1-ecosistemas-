const request = require('supertest');
const app = require('../src/index.js');

describe('API POST /cars', () => {
    test('Debería crear un carro', async () => {
        // Create a new car object
        const car = {
            "marca": "Kia",
            "modelo": "Picanto",
            "año": 2015,
            "color": "Blanco",
            "precio": 21000
        };        
        // Send the car object to the server
        const res = await request(app).post('/cars').send(car);        
        // Check the response and the car data
        expect(res.statusCode).toEqual(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.marca).toEqual(car.marca);
        expect(res.body.modelo).toEqual(car.modelo);
        expect(res.body.año).toEqual(car.año);
        expect(res.body.color).toEqual(car.color);
        expect(res.body.precio).toEqual(car.precio);
    });
});
