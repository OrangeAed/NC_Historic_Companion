import request from 'supertest';
import express from 'express';
import { Express } from 'express';
import TourData from '../server/tours.json';
import { apiCtrl } from '../server/routes/api';
import fs from 'fs';
import path from 'path';
import * as http from "http";


const app: Express = express();

app.use(express.json());

app.get('/tours', apiCtrl.getAllTours);
app.get('/tours/:id', apiCtrl.getTour);
app.post('/tours', apiCtrl.addTour);
app.delete('/tours/:id', apiCtrl.deleteTour);

const originalData = fs.readFileSync(path.resolve(__dirname, '../server/tours.json'), 'utf8');

let server: http.Server;

beforeAll(() => {
    server = app.listen();
});

afterAll(done => {
    server.close(done);
});
afterEach(async () => {
    // Reset the data after each test
    await fs.promises.writeFile(path.resolve(__dirname, '../server/tours.json'), originalData);
});

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
        expect(res.text).toBe("Tour not found");
    });

    it('should return a 404 status code if the tour is not found', async () => {
        const res = await request(app).get('/tours/tour1a;kjdshf');

        expect(res.status).toBe(404);
        expect(res.text).toBe("Tour not found");
    });

    it('should return a 404 status code if the tour is not found', async () => {
        const res = await request(app).get('/tours/tour1/a;kjdsHf');

        expect(res.status).toBe(404);
        // Fix this later
        expect(res.text).toBe(generateNotFoundText("tour1/a;kjdsHf"));
    });
});

describe('POST /tours', () => {
    it('should add a new tour', async () => {
        const newTour = {
            id: 'tour_3',
            title: 'New Tour',
            description: 'This is the third tour',
            image: 'Tour3',
            locations: {
                location_1: {
                    title: 'Location 1',
                    description: 'This is the first location',
                    text: 'This is the first location',
                    image: 'Tour3Location1',
                    location: 'Tour3Location1'
                },
                location_2: {
                    title: 'Location 2',
                    description: 'This is the second location',
                    text: 'This is the second location',
                    image: 'Tour3Location2',
                    location: 'Tour3Location2'
                }
            }
        };

        const beforeAdding = await request(app).get('/tours');
        console.log("before: ", beforeAdding.body)
        const res = await request(app)
            .post('/tours')
            .send(newTour);

        console.log(res.text)
        expect(res.status).toBe(201);
        expect(res.text).toBe('Tour added successfully');

        const getRes = await request(app).get('/tours/tour_3');
        expect(getRes.status).toBe(200);
        expect(getRes.body).toEqual(newTour);

        const allToursRes = await request(app).get('/tours');
        console.log("AFTER: ", allToursRes.body)
        expect(Object.keys(allToursRes.body["tours"]).length).toEqual(Object.keys(beforeAdding.body["tours"]).length + 1);
        expect (allToursRes.body["tours"]["tour_3"]).toEqual(newTour);
    });
});

describe('DELETE /tours/:id', () => {
    it('should delete the tour with the given id', async () => {
        const allToursBeforeDelete = await request(app).get('/tours');
        const initialLength = Object.keys(allToursBeforeDelete.body.tours).length;

        const res = await request(app).delete('/tours/tour_1');

        expect(res.status).toBe(200);
        expect(res.text).toBe('Tour deleted successfully');

        const allToursAfterDelete = await request(app).get('/tours');
        const finalLength = Object.keys(allToursAfterDelete.body.tours).length;

        // Assertion
        expect(finalLength).toBe(initialLength - 1);    });
});

