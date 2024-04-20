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

    // Convert the locations object into an array
    const locationsArray = Object.values(data?.locations || {});

    return (
        <div >
            <div>
                <h1>Locations for {tourId}</h1>
            </div>
            <div>
                <div>
                {locationsArray.length > 0 && (
                    <div>
                        <TourCard tour={tourId} />
                    </div>
                )}
                </div>
                <div>
                    {locationsArray.map((location, index) => (
                    <div key={index}>
                        <h2>Tour {tourId} Location {index + 1}</h2>
                        <LocationCard location={location} />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourView;