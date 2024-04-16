import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTour } from '../../api/api';
import { LocationData } from '../../types';
import BackNextLocationButtons from "../../components/BackNextLocationButtons/BackNextLocationButtons";

type Params = {
    tour: string;
    location: string;
};

const TourLocation: FC = () => {
    const params = useParams<Params>();
    const [data, setData] = useState<LocationData | null>(null);

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

    if (!data) {
        return <div>Loading...</div>;
    }

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
            <BackNextLocationButtons tour={params.tour || "No tour provided" } location={params.location || "No Location Provided" } />
        </div>
    );
};

export default TourLocation;