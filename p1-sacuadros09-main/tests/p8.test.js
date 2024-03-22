const request = require('supertest');
const app = require('../src/index.js');

describe('API PUT /cars/id', () => {
    test('Debería editar un nuevo un carro basado en su id', async () => {
        
        // Create a new car object
        const baseCar = {
            "marca": "Kia",
            "modelo": "Picanto",
            "año": 2015,
            "color": "Blanco",
            "precio": 21000
        };        
        // Send the car object to the server
        const resTemp = await request(app).post('/cars').send(baseCar);
        const carId = resTemp.body.id;

        // Create a new car object
        const editedCar = {
            "año": 2016,
            "color": "Rojo",
            "precio": 20000
        };
        
        // Send a GET request to the server
        const res = await request(app).put(`/cars/${carId}`).send(editedCar); // 
        // Check the response and the car data
        expect(res.statusCode).toEqual(200);
        // Check the response and the cars data
        expect(res.body.marca).toEqual(baseCar.marca);
        expect(res.body.modelo).toEqual(baseCar.modelo);
        expect(res.body.año).toEqual(editedCar.año);
        expect(res.body.color).toEqual(editedCar.color);
        expect(res.body.precio).toEqual(editedCar.precio);
    });
});
