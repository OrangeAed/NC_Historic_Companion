import { Request, Response, NextFunction } from 'express';
import { readFileSync, writeFileSync } from 'fs';

const dataPath = 'server/tours.json';

export default class ApiCtrl {
    getAllTours(req: Request, res: Response, next: NextFunction) {
        try {
            const data = readFileSync(dataPath, 'utf8');
            res.json(JSON.parse(data));
        } catch (err) {

            console.error(err);
            res.status(500).send('Error reading tours.json');
        }
    }

    getTour(req: Request, res: Response, next: NextFunction) {
        try {
            const data = readFileSync(dataPath, 'utf8');
            const tours = JSON.parse(data)["tours"];
            const tour = tours[req.params.id];

            if (tour) {
                res.json(tour);
            } else {
                res.status(404).send('Tour not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
        }
    }

    addTour(req: Request, res: Response, next: NextFunction) {
        const newTour = req.body;
        console.log(newTour)
        if (!newTour || !newTour.id) {
            return res.status(400).send('Invalid tour data: ' + JSON.stringify(newTour));
        }
        try {
            const data = readFileSync(dataPath, 'utf8');
            const tours = JSON.parse(data)["tours"];
            tours[newTour.id] = newTour;
            writeFileSync(dataPath, JSON.stringify({ "tours": tours }, null, 2));
            res.status(201).send('Tour added successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error writing to tours.json');
        }
    }

    deleteTour(req: Request, res: Response, next: NextFunction) {
        const tourId = req.params.id;
        try {
            const data = readFileSync(dataPath, 'utf8');
            const tours = JSON.parse(data)["tours"];
            if (!tours[tourId]) {
                res.status(404).send('Tour not found');
                return;
            }
            delete tours[tourId];
            writeFileSync(dataPath, JSON.stringify({ "tours": tours }, null, 2));
            res.status(200).send('Tour deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error writing to tours.json');
        }
    }
}