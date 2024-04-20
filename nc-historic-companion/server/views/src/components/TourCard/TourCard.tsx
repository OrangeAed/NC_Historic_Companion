// src/components/TourCard/TourCard.tsx
import React from 'react';
import FrontPage from '../../../../../src/pages/FrontPage/FrontPage'; // Import the FrontPage component
import './TourCard.css'; // Import the CSS file

type TourCardProps = {
    tour: string; // Change the prop type to string
};

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className="tour-card">
            <FrontPage tour={tour} /> {/* Pass the tour name to the FrontPage component */}
        </div>
    );
};

export default TourCard;