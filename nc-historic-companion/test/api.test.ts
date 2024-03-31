import request from 'supertest';
import express from 'express';
import { Express } from 'express';
import ApiCtrl from '../server/controllers/api';
import TourData from '../server/tours.json';

const app: Express = express();
const apiCtrl = new ApiCtrl();

app.get('/tours', apiCtrl.getAllTours);

describe('GET /tours', () => {
    it('should return the contents of tours.json', async () => {
        const res = await request(app).get('/tours');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual(TourData);
    });
});

describe('GET /tours/:id', () => {
    it('should return the tour with the given id', async () => {
        const res = await request(app).get('/tours/1');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual(TourData[0]);
    });

    it('should return a 404 status code if the tour is not found', async () => {
        const res = await request(app).get('/tours/100');

        expect(res.status).toBe(404);
        expect(res.text).toBe('Tour not found');
    });
});