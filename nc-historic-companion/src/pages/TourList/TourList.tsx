import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Tour {
    title: string;
    description: string;
    image: string;
}

interface ToursData {
    tours: Record<string, Tour>;
}

interface TourListProps {
    data: ToursData;
}

const TourList: FC<TourListProps> = ({ data }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            {Object.entries(data.tours).map(([tourId, tour]) => (
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
