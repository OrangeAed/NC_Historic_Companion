import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTour } from '../../api/api';
import { LocationData } from '../../types';
import TextComponent from "../../components/LocationComponents/TextComponent/TextComponent";
import ImageComponent from "../../components/LocationComponents/ImageComponent/ImageComponent";
import AudioComponent from "../../components/LocationComponents/AudioComponent/AudioComponent";
import BackNextLocationButtons from "../../components/BackNextLocationButtons/BackNextLocationButtons";

type Params = {
    tour: string;
    location: string;
};

type TourLocationProps = {
    locationData?: LocationData; // Optional LocationData prop
};

const TourLocation: FC<TourLocationProps> = ({ locationData }) => {
    const params = useParams<Params>();
    const [data, setData] = useState<LocationData | null>(null);

    useEffect(() => {
        if (locationData) {
            setData(locationData);
        } else {
            const { tour, location } = params;

            if (!tour || !location) {
                console.error('Tour or location is not defined');
                return;
            }

            getTour(tour)
                .then(tourData => {
                    if (!tourData || !tourData.locations || !tourData.locations[location]) {
                        console.error('Tour or location not found');
                        return;
                    }

                    const locationData = tourData.locations[location];
                    setData(locationData);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [params, locationData]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{data.title}</h1>
            <p style={{ marginTop: '20px' }}>{data.description}</p>

            {data.components && data.components.map((component, index) => {
                switch (component.type) {
                    case 'text':
                        return <TextComponent key={index} content={component.content} />;
                    case 'image':
                        return <ImageComponent key={index} data={component} />;
                    case 'audio':
                        return <AudioComponent key={index} content={component.content} />;
                    default:
                        return null;
                }
            })}
            <BackNextLocationButtons tour={params.tour || "No tour provided" } location={params.location || "No Location Provided" } />
        </div>
    );
};

export default TourLocation;