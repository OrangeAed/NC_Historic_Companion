import { Router, Request, Response } from 'express';
import { Tour } from '../model/tour';
import { locationList } from "./location.controller.ts";

const tourList: Tour[] = [
    {
        title: 'Tour 1',
        description: 'This is tour 1',
        image: 'tour1.jpg',
        audio: 'tour1.mp3',
        locations: locationList
    },
    {
        title: 'Tour 2',
        description: 'This is tour 2',
        image: 'tour2.jpg',
        audio: 'tour2.mp3',
        locations: locationList
    },
    {
        title: 'Tour 3',
        description: 'This is tour 3',
        image: 'tour3.jpg',
        audio: 'tour3.mp3',
        locations: locationList
    }
]

const getAllTours = (req: Request, res: Response) => {
    res.status(200).send(tourList);
}

export default { getAllTours }