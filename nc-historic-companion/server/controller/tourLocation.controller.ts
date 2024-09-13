import { Request, Response } from 'express';
import { tourLocation } from '../model/tourLocation';
import { connection } from '../config/db'
import { QueryError, PoolConnection } from 'mysql2';

// export const tourLocationList: tourLocation[] = [
//     {
//         name: 'tourLocation 1',
//         description: 'This is tourLocation 1',
//         fields: { field1: 'value1', field2: 'value2' }
//     },
//     {
//         name: 'tourLocation 2',
//         description: 'This is tourLocation 2',
//         fields: { field1: 'value1', field2: 'value2' }
//     }
// ]

const getAll = (req: Request, res: Response) => {
    location.selectAll().then(tourLocations => {
        res.status(200).send({
            message: 'OK',
            result: tourLocation
        });
    })
}

export default { getAll }