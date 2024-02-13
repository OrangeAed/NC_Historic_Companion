// TourController.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TourLocation from './TourLocation';
import tourData from '../../data/Tour.json';

function TourController() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        // Fetch the tour data when the component mounts
        setTours(Object.values(tourData));
    }, []);

    return (
        <div>
            {tours.map((tour, index) => (
                <Link key={index} to={`/tour-location/${index + 1}`}>
                    <TourLocation {...tour} />
                </Link>
            ))}
        </div>
    );
}

export default TourController;