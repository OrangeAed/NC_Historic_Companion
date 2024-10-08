import { Request, Response, NextFunction } from 'express';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from "path";

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

        const base64Image = newTour.image;
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const imageFilename = `${newTour.id}.jpg`;
        const imagePath = path.join(__dirname, '..', 'public', 'photos', imageFilename);
        console.log(imagePath)
        console.log("test")
        mkdirSync(path.dirname(imagePath), { recursive: true });

        // Write the image file to the public/photos directory
        writeFileSync(imagePath, imageBuffer);

        // Update the image property to the filename
        newTour.image = imageFilename;

        if (!newTour){
            return res.status(400).send(JSON.stringify(newTour));
        }
        else if (!newTour.id) {
            return res.status(400).send('Invalid tour data: ' + JSON.stringify(newTour));
        }
        try {


            const data = readFileSync(dataPath, 'utf8');
            const tours = JSON.parse(data)["tours"];
            tours[newTour.id] = newTour;
            writeFileSync(dataPath, JSON.stringify({ "tours": tours }, null, 2));
            res.status(201).send(imagePath);
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