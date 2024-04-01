import {Request, Response, NextFunction} from 'express';
import path from 'path';
import fs from 'fs';

export default class ApiCtrl {
    tours: any;

    constructor() {
        try {
            const data = fs.readFileSync(path.resolve(__dirname, '../tours.json'), 'utf8');
            this.tours = JSON.parse(data)["tours"];
        } catch (err) {
            console.error(err);
            this.tours = {};
        }
    }

    /**
     * This method is used to get all tours from the tours.json file.
     * It does not require any parameters.
     * It reads the tours.json file and sends the contents as a response.
     * If there is an error reading the file, it sends a 500 status code with an error message.
     * Example usage: app.get('/tours', apiCtrl.getAllTours);
     */
    getAllTours = (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     console.log("Getting all tours...")
        // } catch (err) {
        //     console.error(err);
        //     // Just putting the next 2 lines to stop the unused error
        //     console.log("Request: " + req);
        //     console.log("Next: " + next);
        //     res.status(500).send('Error reading tours.json');
        // }

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
        // console.log("next: " + next)
        const tour = this.tours[req.params.id];

        if (tour) {
            res.json(tour);
        } else {
            res.status(404).send('Tour not found');
        }
    }

    addTour = async (req: Request, res: Response, next: NextFunction) => {
        // console.log("next: " + next)
        const newTour = req.body;
        if (!newTour || !newTour.id) {
            return res.status(400).send('Invalid tour data: ' + JSON.stringify(newTour));
        }
        try{
            // Add the new tour to the tours object
            this.tours[newTour.id] = newTour;
        } catch(err){
            console.error(err);
            res.status(500).send('Tour did not ');
        }


        // Write the updated tours data back to the tours.json file

        // Write the updated tours data back to the tours.json file
        try {
            await fs.promises.writeFile(path.resolve(__dirname, '../tours.json'), JSON.stringify({"tours": this.tours}, null, 2));
            res.status(201).send('Tour added successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error writing to tours.json');
        }
    }

    deleteTour = (req: Request, res: Response, next: NextFunction) => {
        // console.log("next: " + next)
        const tourId = req.params.id;

        // Check if the tour exists
        if (!this.tours[tourId]) {
            res.status(404).send('Tour not found');
            return;
        }

        // Delete the tour from the tours object
        delete this.tours[tourId];

        // Write the updated tours data back to the tours.json file
        fs.writeFile(path.resolve(__dirname, '../tours.json'), JSON.stringify(this.tours, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to tours.json');
            } else {
                res.status(200).send('Tour deleted successfully');
            }
        });
    }
    // other methods...}
}