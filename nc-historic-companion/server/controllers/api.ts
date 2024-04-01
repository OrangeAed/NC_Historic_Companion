import {Request, Response, NextFunction} from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ApiCtrl {
    tours: any;

    constructor() {
        try {
            const data = fs.readFileSync(resolve(__dirname, '../tours.json'), 'utf8');
            this.tours = JSON.parse(data)["tours"];
        } catch (err) {
            console.error(err);
            this.tours = {};
        }
    }

    getAllTours = (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = fs.readFileSync(resolve(__dirname, '../tours.json'), 'utf8');
            res.json(JSON.parse(data));
        } catch (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
        }
    }

    getTour = (req: Request, res: Response, next: NextFunction) => {
        const tour = this.tours[req.params.id];

        if (tour) {
            res.json(tour);
        } else {
            res.status(404).send('Tour not found');
        }
    }

    addTour = async (req: Request, res: Response, next: NextFunction) => {
        const newTour = req.body;
        if (!newTour || !newTour.id) {
            return res.status(400).send('Invalid tour data: ' + JSON.stringify(newTour));
        }
        try{
            this.tours[newTour.id] = newTour;
        } catch(err){
            console.error(err);
            res.status(500).send('Tour did not ');
        }

        try {
            await fs.promises.writeFile(resolve(__dirname, '../tours.json'), JSON.stringify({"tours": this.tours}, null, 2));
            res.status(201).send('Tour added successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error writing to tours.json');
        }
    }

    deleteTour = (req: Request, res: Response, next: NextFunction) => {
        const tourId = req.params.id;

        if (!this.tours[tourId]) {
            res.status(404).send('Tour not found');
            return;
        }

        delete this.tours[tourId];

        fs.writeFile(resolve(__dirname, '../tours.json'), JSON.stringify(this.tours, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to tours.json');
            } else {
                res.status(200).send('Tour deleted successfully');
            }
        });
    }
}