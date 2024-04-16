import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTour } from '../../api/api';
import { LocationData } from '../../types';

type Params = {
    tour: string;
    location: string;
};

const TourLocation: FC = () => {
    const params = useParams<Params>();
    const [data, setData] = useState<LocationData | null>(null);
    const [previousLocationUrl, setPreviousLocationUrl] = useState<string>('');
    const [nextLocationUrl, setNextLocationUrl] = useState<string>('');

    useEffect(() => {
        const { tour, location } = params;

        if (!tour || !location) {
            console.error('Tour or location is not defined');
            return;
        }

        getTour(tour)
            .then(tourData => {
                const locationData = tourData.locations[location];
                setData(locationData);
            })
            .catch(error => {
                console.error(error);
                // Handle the error appropriately in your application
            });
    }, [params]);

    const getPreviousLocationUrl = async (): Promise<string> => {
        const { tour, location } = params;
        if (!tour || !location) {
            console.error('Tour or location is not defined');
            return '';
        }
        const locationIndex = parseInt(location.split('_')[1]);
        const tourData = await getTour(tour);
        const locationsLength = Object.keys(tourData.locations).length;
        // If it's the first location, return to the tour page
        if (locationIndex === 1) {
            return `/tour/${encodeURIComponent(tour)}`;
        }
        // Calculate the previous location index
        const previousLocationIndex = locationIndex - 1;
        return `/tour/${encodeURIComponent(tour)}/location_${encodeURIComponent(previousLocationIndex)}`;
    };

    const getNextLocationUrl = async (): Promise<string> => {
        const { tour, location } = params;
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
    if (!data) {
        return <div>Loading...</div>;
    }
    console.log(data.audio)

    getPreviousLocationUrl().then(url => setPreviousLocationUrl(url));
    getNextLocationUrl().then(url => setNextLocationUrl(url));


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{data.title}</h1>
            <img src={data.image} alt={data.title} style={{ maxWidth: '100%', maxHeight: '300px' }} />
            <p style={{ marginTop: '20px' }}>{data.description}</p>
            <p>{data.text}</p>
            <audio controls>
                <source src={data.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div>
                <a href={previousLocationUrl}>
                    <button>Previous</button>
                </a>
                <a href={nextLocationUrl}>
                    <button>Next</button>
                </a>
            </div>
        </div>
    );
};

export default TourLocation;