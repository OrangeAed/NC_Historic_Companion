import { NextFunction, Request, Response } from "express";
// import { TourData } from "../tours.json";
import fs from 'fs';
import path from 'path';

export default class ApiCtrl {
    getAllTours = (req: Request, res: Response, next: NextFunction) => {
        /**
         * This method is used to get all tours from the tours.json file.
         * It does not require any parameters.
         * It reads the tours.json file and sends the contents as a response.
         * If there is an error reading the file, it sends a 500 status code with an error message.
         * Example usage: app.get('/tours', apiCtrl.getAllTours);
         */
        try {
            console.log("Getting all tours...")
        } catch (err) {
            console.error(err);
            // Just putting the next 2 lines to stop the unused error
            console.log("Request: " + req);
            console.log("Next: " + next);
            res.status(500).send('Error reading tours.json');
        }

        try {
            const data = fs.readFileSync(path.resolve(__dirname, '../tours.json'), 'utf8');
            res.json(JSON.parse(data));
        } catch (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
        }
    }

    /**
     * This method is used to get a specific tour from the tours.json file.
     * It requires a tour id as a route parameter (e.g., /tours/:id).
     * It reads the tours.json file, finds the tour with the given id, and sends it as a response.
     * If the tour is not found, it sends a 404 status code with a message.
     * If there is an error reading the file, it sends a 500 status code with an error message.
     * Example usage: app.get('/tours/:id', apiCtrl.getTour);
     */
    getTour = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Getting all tours...")
        } catch (err) {
            console.error(err);
            // Just putting the next line to stop the unused error
            console.log("Next: " + next);
            res.status(500).send('Error reading tours.json');
        }

        try {
            const data = fs.readFileSync(path.resolve(__dirname, '../tours.json'), 'utf8');
            const tours = JSON.parse(data);
            const tour = tours.find((tour: { id: string; }) => tour.id === req.params.id);

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
}