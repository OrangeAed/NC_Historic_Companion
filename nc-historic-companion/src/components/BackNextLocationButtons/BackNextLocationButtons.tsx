import React, { useEffect, useState } from 'react';
import { getTour } from '../../api/api';

const BackNextLocationButtons = ({ tour, location }: { tour: string, location: string }) => {
    const [previousLocationUrl, setPreviousLocationUrl] = useState<string>('');
    const [nextLocationUrl, setNextLocationUrl] = useState<string>('');

    useEffect(() => {
        const getPreviousLocationUrl = async (): Promise<string> => {
            if (!tour || !location) {
                console.error('Tour or location is not defined');
                return '';
            }
            const locationIndex = parseInt(location.split('_')[1]);
            // If it's the first location, return to the tour page
            if (locationIndex === 1) {
                return `/tour/${encodeURIComponent(tour)}`;
            }
            // Calculate the previous location index
            const previousLocationIndex = locationIndex - 1;
            return `/tour/${encodeURIComponent(tour)}/location_${encodeURIComponent(previousLocationIndex)}`;
        };

        const getNextLocationUrl = async (): Promise<string> => {
            if (!tour || !location) {
                console.error('Tour or location is not defined');
                return '';
            }
            const locationIndex = parseInt(location.split('_')[1]);
            const tourData = await getTour(tour);
            const locationsLength = Object.keys(tourData.locations).length;
            // If it's the last location, return to the tour page
            if (locationIndex === locationsLength) {
                return `/tour/${encodeURIComponent(tour)}`;
            }
            // Calculate the next location index
            const nextLocationIndex = locationIndex + 1;
            return `/tour/${encodeURIComponent(tour)}/location_${encodeURIComponent(nextLocationIndex)}`;
        };

        getPreviousLocationUrl().then(url => setPreviousLocationUrl(url));
        getNextLocationUrl().then(url => setNextLocationUrl(url));
    }, [tour, location]);

    return (
        <div>
            <a href={previousLocationUrl}>
                <button>Previous</button>
            </a>
            <a href={nextLocationUrl}>
                <button>Next</button>
            </a>
        </div>
    )
}

export default BackNextLocationButtons;