// src/components/LocationCard/LocationCard.tsx
import React from 'react';
import { LocationData } from '../../../../../src/types';
import TourLocation from '../../../../../src/pages/TourLocation/TourLocation'; // Import the TourLocation component
import './LocationCard.css'; // Import the CSS file

interface LocationCardProps {
    location: LocationData;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
    return (
        <div className="location-card">
            <TourLocation locationData={location} /> {/* Render the TourLocation component */}
        </div>
    );
};

export default LocationCard;