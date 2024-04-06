import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTours } from "../../api/api.ts";
import {TourData, LocationData} from "../../types.ts";

const TourList: FC = () => {
    const [data, setData] = useState<Record<string, TourData> | null>(null);

    useEffect(() => {
        getAllTours().then((response) => { setData(response) });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            {Object.entries(data).map(([tourId, tour]) => (
                <Link key={tourId} to={`/tour/${tourId}`}>
                    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', display: 'inline-block' }}>
                        <img src={tour.image} alt={tour.title} style={{ width: '100%', height: 'auto' }} />
                        <h2>{tour.title}</h2>
                        <p>{tour.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TourList;