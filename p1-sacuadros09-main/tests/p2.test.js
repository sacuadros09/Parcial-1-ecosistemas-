const request = require('supertest');
const app = require('../src/index.js');

describe('API POST /cars', () => {
    test('No debería crear un carro', async () => {
        // Create a new car object
        const car = {
            "id": 1, // don't send the id
            "marca": "Kia",
            "modelo": "Picanto",
            "año": "2015", // send a string instead of a number
            "color": "Blanco",
            "precio": 21000 
        };
        // Send the car object to the server
        const res = await request(app).post('/cars').send(car);
        // Check the response and the car data
        expect(res.statusCode).toEqual(400); // bad request http status code 400
        // Check the response and the car data
        expect(res.body.id).not.toBeDefined();
        expect(res.body.marca).not.toBeDefined();
        expect(res.body.modelo).not.toBeDefined();
        expect(res.body.año).not.toBeDefined();
        expect(res.body.color).not.toBeDefined();
        expect(res.body.precio).not.toBeDefined();
        // Check the response validation errors using zod
        expect(res.body).toEqual([
            {
                "code": "invalid_type",
                "expected": "never",
                "received": "number",
                "path": [
                    "id"
                ],
                "message": "Expected never, received number"
            },
            {
                "code": "invalid_type",
                "expected": "number",
                "received": "string",
                "path": [
                    "año"
                ],
                "message": "Expected number, received string"
            }
        ]);
    });
});
