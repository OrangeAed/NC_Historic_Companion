import { Request, Response, NextFunction } from 'express';
import { readFile, writeFile } from 'fs/promises';

const dataPath = 'server/tours.json';
export default class ApiCtrl {
    async getAllTours(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await readFile(dataPath, 'utf8');
            res.json(JSON.parse(data));
        } catch (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
        }
    }

    async getTour(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await readFile(dataPath, 'utf8');
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

    async addTour(req: Request, res: Response, next: NextFunction) {
        const newTour = req.body;
        if (!newTour || !newTour.id) {
            return res.status(400).send('Invalid tour data: ' + JSON.stringify(newTour));
        }
        try {
            const data = await readFile(dataPath, 'utf8');
            const tours = JSON.parse(data)["tours"];
            tours[newTour.id] = newTour;
            await writeFile(dataPath, JSON.stringify({ "tours": tours }, null, 2));
            res.status(201).send('Tour added successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error writing to tours.json');
        }
    }

    async deleteTour(req: Request, res: Response, next: NextFunction) {
        const tourId = req.params.id;
        try {
            const data = await readFile(dataPath, 'utf8');
            const tours = JSON.parse(data)["tours"];
            if (!tours[tourId]) {
                res.status(404).send('Tour not found');
                return;
            }
            delete tours[tourId];
            await writeFile(dataPath, JSON.stringify({ "tours": tours }, null, 2));
            res.status(200).send('Tour deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error writing to tours.json');
        }
    }
}