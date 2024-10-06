import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTours } from "../../../server/api/api.ts";
import {TourData} from "../../types.ts";

const TourList: FC = () => {
    const [data, setData] = useState<Record<string, TourData> | null>(null);

    useEffect(() => {
        getAllTours().then((response) => { setData(response) });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            {Object.entries(data).map(([tourId, tour]) => (
                <Link key={tourId} to={`/tour/${tourId}`}>
                    <div className="card">
                        <h2 className="card-title">{tour.title}</h2>
                        <img src={tour.image} alt={tour.title} className="card-image" />
                        <p className="card-description">{tour.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TourList;