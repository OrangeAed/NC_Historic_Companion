// server/controllers/tour.controller.ts
import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { TourData } from '../models/tour';
import { TourLocationData } from '../models/tourLocation';
import {LocationComponentData} from "../models/locationComponent.ts";

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
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const newTour: TourData = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        image: files && files['image'] ? `/public/photos/${files['image'][0].filename}` : '',
        audio: files && files['audio'] ? `/public/audio/${files['audio'][0].filename}` : '',
        locations: {}
    };

    if (!newTour.id) {
        return res.status(400).send('Invalid tour data');
    }

    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        if (tours[newTour.id]) {
            return res.status(400).send('Tour already exists');
        }
        tours[newTour.id] = newTour;
        writeFileSync(dataPath, JSON.stringify({ tours }, null, 2));
        res.status(201).json({ message: 'Tour added successfully' });
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

export const addTourLocation = (req: Request, res: Response) => {
    const tourId = req.params.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const components: LocationComponentData[] = [];
    if (req.body.image){
        components.push({
            index: 0,
            type: 'image',
            content: req.body.image
        });
    }
    if (req.body.audio){
        components.push({
            index: 1,
            type: 'audio',
            content: req.body.audio
        });
    }
    if (req.body.text){
        components.push({
            index: 2,
            type: 'text',
            content: req.body.text
        });
    }


    const newLocation: TourLocationData = {
        title: req.body.title,
        description: req.body.description,
        components: components
    };

    if (!newLocation.title) {
        return res.status(400).send('Invalid location data');
    }

    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        const tour = tours[tourId];

        if (!tour) {
            return res.status(404).send('Tour not found');
        }

        const locationId = `location_${Object.keys(tour.locations).length + 1}`;
        tour.locations[locationId] = newLocation;
        writeFileSync(dataPath, JSON.stringify({ tours }, null, 2));
        res.status(201).json({ message: 'Location added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to tours.json');
    }
};

export const deleteTourLocation = (req: Request, res: Response) => {
    const { id, locationId } = req.params;

    try {
        const data = readFileSync(dataPath, 'utf8');
        const tours = JSON.parse(data).tours;
        const tour = tours[id];

        if (!tour) {
            return res.status(404).send('Tour not found');
        }

        if (!tour.locations[locationId]) {
            return res.status(404).send('Location not found');
        }

        delete tour.locations[locationId];
        writeFileSync(dataPath, JSON.stringify({ tours }, null, 2));
        res.status(200).send('Location deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to tours.json');
    }
}