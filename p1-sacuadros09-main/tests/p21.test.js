const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?preciotag=highest', () => {
    test('Debería traer el carro de mayor precio', async () => {
        // Send a GET request to the server
        const resTemp = await request(app).get(`/cars`).send();
        const res = await request(app).get(`/cars?preciotag=highest`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        const highestPriceCar = res.body[0];
        const maxPrice = Math.max(...resTemp.body.map(car => car.precio));
        expect(highestPriceCar.precio).toEqual(maxPrice);
    });
});