const request = require('supertest');
const app = require('../src/index.js');

describe('API GET Query /cars?marca=XXX&año=YYYY', () => {
    test('Debería traer los carros de un determinado conjunto de marca y año', async () => {
        const marca = "Honda";
        const año = 2022;
        // Send a GET request to the server
        const res = await request(app).get(`/cars?marca=${marca}&año=${año}`).send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
        res.body.forEach(car => {
            expect(car.marca).toEqual(marca);
            expect(car.año).toEqual(año);
        });        
    });
});