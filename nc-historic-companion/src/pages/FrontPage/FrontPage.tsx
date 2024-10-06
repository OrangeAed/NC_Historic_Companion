// src/pages/FrontPage/FrontPage.tsx
import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './FrontPage.css';
import {getTour} from "../../../server/api/api";
import {TourData} from "../../../server/models/tour"; // Import the types

type Params = {
    tour: string;
};

interface FrontPageProps {
    tour?: string;
}

const FrontPage: FC<FrontPageProps> = ({tour: propTour}) => {
    const navigate = useNavigate();
    const {tour: urlTour} = useParams<Params>();
    const [data, setData] = useState<TourData | null>(null);

    const tour = propTour || urlTour;

    useEffect(() => {
        if (!tour) {
            console.error('Tour is not defined');
            return;
        }
        getTour(tour).then((response) => {
            setData(response)
        });
    }, [tour]);

    const handleButtonClick = () => {
        if (data) {
            const firstLocationKey = Object.keys(data.locations)[0];
            navigate(`/tour/${tour}/${firstLocationKey}`);
        }
    };

    const goToTourList = () => {
        navigate('/');
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="front-page">
            <h1 className="title">{data.title}</h1>
            <img className="image" src={data.image} alt={data.title} style={{width: '100%', height: 'auto'}}/>
            <p className="description">{data.description}</p>
            <div className="button-container">
                <button className="button-spacing grey-button" onClick={goToTourList}>Back to Tour List</button>

                <button className="button-spacing grey-button" onClick={handleButtonClick}>
                    Start Tour
                </button>
            </div>
        </div>
    );
};

export default FrontPage;