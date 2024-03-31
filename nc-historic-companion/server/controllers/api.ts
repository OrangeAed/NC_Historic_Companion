import { NextFunction, Request, Response } from "express";
// import { TourData } from "../tours.json";
import fs from 'fs';
import path from 'path';

export default class ApiCtrl {
    getAllTours = (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = fs.readFileSync(path.resolve(__dirname, '../tours.json'), 'utf8');
            res.json(JSON.parse(data));
        } catch (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
        }
    }
}