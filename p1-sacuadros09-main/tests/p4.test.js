const request = require('supertest');
const app = require('../src/index.js');

describe('API GET /cars', () => {
    test('Debería traer todos los carros incluyendo los nuevos', async () => {

        // Create a new car object
        const car = {
            "marca": "Tesla",
            "modelo": "Cybertruck",
            "año": 2025,
            "color": "Gris",
            "precio": 96000
        };

        // Send the car object to the server
        await request(app).post('/cars').send(car);
        // Send a GET request to the server
        const res = await request(app).get('/cars').send();
        // Check the response and the car data
        expect(res.statusCode).toEqual(200); // OK http status code 200
        // Check the response and the cars data
        expect(res.body.length).toEqual(16);
        expect(res.body[res.body.length-1].id).toBeDefined();
        expect(res.body[res.body.length-1].marca).toEqual(car.marca);
        expect(res.body[res.body.length-1].modelo).toEqual(car.modelo);
        expect(res.body[res.body.length-1].año).toEqual(car.año);
        expect(res.body[res.body.length-1].color).toEqual(car.color);
        expect(res.body[res.body.length-1].precio).toEqual(car.precio);
    });
});
