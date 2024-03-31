import request from 'supertest';
import express from 'express';
import { Express } from 'express';
import ApiCtrl from '../server/controllers/api';

const app: Express = express();
const apiCtrl = new ApiCtrl();

app.get('/tours', apiCtrl.getAllTours);

describe('GET /tours', () => {
    it('should return the contents of tours.json', async () => {
        const res = await request(app).get('/tours');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        // Add more assertions based on the expected structure of your tours.json
    });
});