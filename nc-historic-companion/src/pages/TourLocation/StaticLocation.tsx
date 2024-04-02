import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import * as image1 from '../../../public/photos/D_2020_06_09_7437_Brunswick_Town_Ft_Anderson_Singing_On_The_Land_Church_Landscape_LF.jpg';

interface TourLocationProps {
    tourId: string;
    locationId: string;
}

const StaticLocation1: FC<TourLocationProps> = ({ tourId, locationId }) => {
    const params = useParams<{ tourId: string; locationId: string }>();

    const getNextLocationUrl = (): string => {
        const { tourId, locationId } = params;
        const locationIndex = parseInt(locationId.split('_')[1]);
        const nextLocationIndex = locationIndex + 1;
        return `/tour/${tourId}/location_${nextLocationIndex}`;
    };

    const getPreviousLocationUrl = (): string => {
        const { tourId, locationId } = params;
        const locationIndex = parseInt(locationId.split('_')[1]);

        if (locationIndex === 1) {
            return `/tour/${tourId}`;
        }

        const previousLocationIndex = locationIndex - 1;
        return `/tour/${tourId}/location_${previousLocationIndex}`;
    };

    // Hardcoded tour data
    const data = {
        title: "Location 1",
        description: "This is the first location",
        image: image1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
    };

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
