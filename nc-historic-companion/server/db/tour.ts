import { PoolConnection, QueryError } from "mysql2";
import { connection } from "../config/db";
import {Tour} from "../model/tour.ts";

const selectAll = (): Promise<Tour[]> => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err: QueryError, conn: PoolConnection) => {
            conn.query("select * from tour", (err, resultSet: Tour[]) => {
                conn.release();
                if (err) {
                    return reject(err);
                } else {
                    return resolve(resultSet);
                }
            })
        });
    });
}

export default { selectAll }