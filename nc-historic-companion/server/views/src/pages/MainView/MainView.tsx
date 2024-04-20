// src/pages/MainView/MainView.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTours } from '../../../../../src/api/api';
import { TourData } from '../../../../../src/types';
import TourCard from '../../components/TourCard/TourCard';
import './MainView.css'; // Import the CSS file

const MainView: React.FC = () => {
    const [data, setData] = useState<Record<string, TourData> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllTours()
            .then(response => {
                setData(response);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>All Tours</h1>
            <div className="tour-list">
                {Object.entries(data!).map(([tourId, tour]) => (
                    <Link to={`/tour/${tourId}`} key={tourId}>
                        <TourCard tour={tourId} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainView;