import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type Params = Record<string, string>;

interface LocationData {
    title: string;
    description: string;
    image: string;
    text: string;
}

const TourLocation: FC = () => {
    const params = useParams<Params>();
    const [data, setData] = useState<LocationData | null>(null);

    useEffect(() => {
        const { tour, location } = params;

        if (!tour || !location) {
            console.error('Tour or location is not defined');
            return;
        }

        fetch(`/api/tours/${tour}/${location}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => {
                console.error(error);
                // Handle the error appropriately in your application
            });
    }, [params]);

    const getNextLocationUrl = (): string => {
        const { tour, location } = params;
        const locationIndex = parseInt(location.split('_')[1]);

        // Calculate the next location index
        const nextLocationIndex = locationIndex + 1;
        return `/tour/${tour}/location_${nextLocationIndex}`;
    };

    const getPreviousLocationUrl = (): string => {
        const { tour, location } = params;
        const locationIndex = parseInt(location.split('_')[1]);
        // If it's the first location, return to the tour page
        if (locationIndex === 1) {
            return `/tour/${tour}`;
        }

        // Calculate the previous location index
        const previousLocationIndex = locationIndex - 1;
        return `/tour/${tour}/location_${previousLocationIndex}`;
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{data.title}</h1>
            <img src={data.image} alt={data.title} style={{ maxWidth: '100%', maxHeight: '300px' }} />
            <p style={{ marginTop: '20px' }}>{data.description}</p>
            <p>{data.text}</p>
            <div>
                <a href={getPreviousLocationUrl()}><button>Previous</button></a>
                <a href={getNextLocationUrl()}><button>Next</button></a>
            </div>
        </div>
    );
};

export default TourLocation;