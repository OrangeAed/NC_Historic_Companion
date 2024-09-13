// server/controllers/tour.controller.ts
import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { TourData } from '../models/tour';

const dataPath = './server/tours.json';

export const getAllTours = (req: Request, res: Response) => {
    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        res.status(200).json(tours);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading tours.json');
    }
};

export const getTour = (req: Request, res: Response) => {
    const tourId = req.params.id;

    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        const tour = tours[tourId];
        if (!tour) {
            return res.status(404).send('Tour not found');
        }
        res.status(200).json(tour);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading tours.json');
    }
}

export const addTour = (req: Request, res: Response) => {
    const newTour: TourData = req.body;

    if (!newTour || !newTour.id) {
        return res.status(400).send('Invalid tour data');
    }

    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        tours[newTour.id] = newTour;
        writeFileSync(dataPath, JSON.stringify({ tours }, null, 2));
        res.status(201).send('Tour added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to tours.json');
    }
};

export const deleteTour = (req: Request, res: Response) => {
    const tourId = req.params.id;

    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        if (!tours[tourId]) {
            return res.status(404).send('Tour not found');
        }
        delete tours[tourId];
        writeFileSync(dataPath, JSON.stringify({ tours }, null, 2));
        res.status(200).send('Tour deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to tours.json');
    }
};