import { PoolConnection, QueryError } from "mysql2";
import { connection } from "../config/db";
import { tourLocation } from "../model/tourLocation";

const selectAll = (): Promise<tourLocation[]> => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err: QueryError, conn: PoolConnection) => {
            conn.query("select * from tourLocation", (err, resultSet: tourLocation[]) => {
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