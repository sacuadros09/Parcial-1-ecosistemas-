const request = require('supertest');
const app = require('../src/index.js');

describe('API GET /cars/id', () => {
    test('Debería traer un carro basado en su id', async () => {

        // Create a new car object
        const car = {
            "marca": "Renault",
            "modelo": "Sandero",
            "año": 2019,
            "color": "Gris",
            "precio": 15000
        };

        // Send the car object to the server
        const rTemp = await request(app).post('/cars').send(car);

        // Send a GET request to the server
        const res = await request(app).get(`/cars/${rTemp.body.id}`).send();
        // Check the response and the car data
        expect(res.statusCode).toEqual(200); // OK http status code 200
        // Check the response and the cars data
        expect(res.body.id).toEqual(rTemp.body.id);
        expect(res.body.marca).toEqual(car.marca);
        expect(res.body.modelo).toEqual(car.modelo);
        expect(res.body.año).toEqual(car.año);
        expect(res.body.color).toEqual(car.color);
        expect(res.body.precio).toEqual(car.precio);
    });
});
