// server/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import { getAllTours, getTour, addTour, deleteTour, addTourLocation } from './controllers/tour.controller.ts';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/api/tours', getAllTours);
app.post('/api/tours', addTour);
app.get('/api/tours/:id', getTour);
app.delete('/api/tours/:id', deleteTour);
app.post('/api/tours/:id', addTourLocation);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});