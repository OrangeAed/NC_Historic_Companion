// TourController.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TourLocation from './TourLocation';
import tourData from '../../data/Tour.json';

// Define the type Tour
type Tour = {
    name: string;
    image: string;
    abridgedText: string;
    text: string;
    audio: string;
};

function TourController() {
    // Explicitly define the type of tours state
    const [tours, setTours] = useState<Tour[]>([]);

    useEffect(() => {
        // Fetch the tour data when the component mounts
        setTours(Object.values(tourData) as Tour[]);
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