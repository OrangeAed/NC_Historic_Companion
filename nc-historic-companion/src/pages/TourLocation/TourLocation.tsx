import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Params = Record<string, string>;

const TourLocation: FC = () => {
    const params = useParams<Params>();
    const [data, setData] = useState<{ title: string; description: string; image: string; text: string; } | null>(null);

    useEffect(() => {
        const { tour, location } = params;

        if (!tour || !location) {
            console.error('Tour or location is not defined');
            return;
        }

        fetch('/data/tours.json')
            .then(response => response.json())
            .then(data => {
                // Validate the tour and location parameters
                if (!Object.prototype.hasOwnProperty.call(data.tours, tour) || !Object.prototype.hasOwnProperty.call(data.tours[tour].locations, location)) {
                    throw new Error('Invalid tour or location');
                }

                const tourData = data.tours[tour];
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
        <div>
            <h1>{data.title}</h1>
            <img src={data.image} alt={data.title} />
            <p>{data.description}</p>
            <p>{data.text}</p>
        </div>
    );
};

export default TourLocation;