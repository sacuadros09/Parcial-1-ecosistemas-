const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?marcatag=all', () => {
    test('Debería traer todas las marcas', async () => {
        // Send a GET request to the server
        const resTemp = await request(app).get(`/cars`).send();
        const res = await request(app).get(`/cars?marcatag=all`).send();
        expect(res.statusCode).toEqual(200);
        const allBrands = res.body;
        const brands = resTemp.body.map(car => car.marca);
        const uniqueBrands = [...new Set(brands)];
        expect(allBrands).toEqual(uniqueBrands);
    });
});