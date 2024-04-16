import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FrontPage.css';
import {getTour} from "../../api/api.ts";

interface LocationData {
    title: string;
    description: string;
    image: string;
}

interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
}

type Params = {
    tour: string;
};

const FrontPage: FC = () => {
    const navigate = useNavigate();
    const { tour } = useParams<Params>();
    const [data, setData] = useState<TourData | null>(null);

    // useEffect(() => {
    //     fetch('/data/tours.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (!tour) {
    //                 console.error('Tour is not defined');
    //                 return;
    //             }
    //
    //             const tourData = data.tours[tour];
    //             setData(tourData);
    //         });
    // }, [tour]);

    useEffect(() => {
        if (!tour) {
            console.error('Tour is not defined');
            return;
        }
        getTour(tour).then((response) => { setData(response) });
        console.log('tour:', tour)
    }, [tour]);
    console.log(data)

    const handleButtonClick = () => {
        if (data) {
            const firstLocationKey = Object.keys(data.locations)[0];
            navigate(`/tour/${tour}/${firstLocationKey}`);

        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="front-page">
            <h1 className="title">{data.title}</h1>
            <img className="image" src={data.image} alt={data.title} style={{ width: '100%', height: 'auto' }}/>
            <p className="description">{data.description}</p>
            <button className="start-button" onClick={handleButtonClick}>
                Start Tour
            </button>
        </div>
    );
};

export default FrontPage;