// src/pages/TourView/TourView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTour } from '../../../../../src/api/api';
import { TourData } from '../../../../../src/types';
import LocationCard from '../../components/LocationCard/LocationCard';
import TourCard from '../../components/TourCard/TourCard'; // Import the TourCard component
import './TourView.css'; // Import the CSS file

type TourViewProps = Record<string, string>;

const TourView: React.FC = () => {
    const { tourId } = useParams<TourViewProps>();
    const [data, setData] = useState<TourData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!tourId) {
            return;
        }

        getTour(tourId)
            .then(response => {
                setData(response);
                setIsLoading(false);
            });
    }, [tourId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="location-list">
            <div>
                <h1>Locations for Tour {tourId}</h1>
            </div>
            {data && (
                <div>
                    <TourCard tour={data} />
                </div>
            )}
            {data && Object.values(data.locations).slice(1).map((location, index) => (
                <div key={index}>
                    <h2>Tour {tourId} Location {index + 2}</h2>
                    <LocationCard location={location} />
                </div>
            ))}
        </div>
    );
};

export default TourView;