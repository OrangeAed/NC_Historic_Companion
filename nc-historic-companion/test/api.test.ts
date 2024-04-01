import request from 'supertest';
import express from 'express';
import { Express } from 'express';
import ApiCtrl from '../server/controllers/api';
import TourData from '../server/tours.json';

const app: Express = express();
const apiCtrl = new ApiCtrl();

app.get('/tours', apiCtrl.getAllTours);


const generateNotFoundText = (s: string) => {
    let notFoundText = "<!DOCTYPE html>\n";
    notFoundText += "<html lang=\"en\">\n";
    notFoundText += "<head>\n";
    notFoundText += "<meta charset=\"utf-8\">\n";
    notFoundText += "<title>Error</title>\n";
    notFoundText += "</head>\n";
    notFoundText += "<body>\n";
    notFoundText += "<pre>Cannot GET /tours/" + s + "</pre>\n";
    notFoundText += "</body>\n";
    notFoundText += "</html>\n";
    return notFoundText;
}

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
        const res = await request(app).get('/tours/tour_1');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual(TourData["tours"]["tour_1"]);
    });

    it('should return the tour with the given id', async () => {
        const res = await request(app).get('/tours/tour_2');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual(TourData["tours"]["tour_2"]);
    });

    it('should return a 404 status code if the tour is not found', async () => {
        const res = await request(app).get('/tours/fake_tour_that_does_not_exist');

        expect(res.status).toBe(404);
        expect(res.text).toBe(generateNotFoundText("fake_tour_that_does_not_exist"));
    });

    it('should return a 404 status code if the tour is not found', async () => {
        const res = await request(app).get('/tours/tour1a;kjdshf');

        expect(res.status).toBe(404);
        expect(res.text).toBe(generateNotFoundText("tour1a;kjdshf"));
    });

    it('should return a 404 status code if the tour is not found', async () => {
        const res = await request(app).get('/tours/tour1/a;kjdsHf');

        expect(res.status).toBe(404);
        expect(res.text).toBe(generateNotFoundText("tour1/a;kjdsHf"));
    });
});