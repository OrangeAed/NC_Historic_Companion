// src/components/LocationCard.tsx
import React from 'react';
import { LocationData } from '../../../../../src/types';
import './LocationCard.css'; // Import the CSS file

interface LocationCardProps {
    location: LocationData;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
    // Adjust the image path based on your directory structure
    const imagePath = 'http://localhost:5001' + location.image;

    return (
        <div className="location-card">
            <h2>{location.title}</h2>
            <img src={imagePath} alt={location.title} style={{width: '100%', height: 'auto'}}/>
            <p>{location.description}</p>
        </div>
    );
};

export default LocationCard;