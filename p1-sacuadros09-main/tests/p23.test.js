const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?preciotag=average', () => {
    test('Debería traer el precio promedio', async () => {
        // Send a GET request to the server
        const resTemp = await request(app).get(`/cars`).send();
        const res = await request(app).get(`/cars?preciotag=average`).send();
        expect(res.statusCode).toEqual(200);
        const averagePrice = res.body;
        let sum = 0;
        for (let i = 0; i < resTemp.body.length; i++) {
            sum += resTemp.body[i].precio;
        }
        const avg = sum / resTemp.body.length;
        expect(averagePrice.average).toEqual(avg);
    });
});