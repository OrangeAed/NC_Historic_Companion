import { Router, Request, Response } from 'express';
import { Location } from '../model/location';

export const locationList: Location[] = [
    {
        name: 'Location 1',
        description: 'This is location 1',
        fields: { field1: 'value1', field2: 'value2' }
    },
    {
        name: 'Location 2',
        description: 'This is location 2',
        fields: { field1: 'value1', field2: 'value2' }
    }
]

const getAllLocations = (req: Request, res: Response) => {
    res.status(200).send(locationList);
}

export default { getAllLocations }