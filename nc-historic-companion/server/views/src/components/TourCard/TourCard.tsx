// src/components/TourCard.tsx
import React from 'react';
import { TourData } from '../../../../../src/types';
import './TourCard.css'; // Import the CSS file


interface TourCardProps {
    tour: TourData;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    // Adjust the image path based on your directory structure
    const imagePath = 'http://localhost:5001' + tour.image;

    return (
        <div className="tour-card">
            <h2>{tour.title}</h2>
            <img src={imagePath} alt={tour.title} style={{width: '100%', height: 'auto'}}/>
            <p>{tour.description}</p>
        </div>
    );
};

export default TourCard;