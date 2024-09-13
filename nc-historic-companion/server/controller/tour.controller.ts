import { Router, Request, Response } from 'express';
import { Tour } from '../model/tour';
import {connection} from "../config/db.ts";
import {PoolConnection, QueryError} from "mysql2";

const getAll = (req: Request, res: Response) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
        conn.query("select * from product", (err, resultSet: Tour[]) => {
            conn.release();
            if (err) {
                res.status(500).send({
                    message: 'INTERNAL SERVER ERROR',
                    result: null
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    result: resultSet
                });
            }
        })
    });
}

export default { getAll }