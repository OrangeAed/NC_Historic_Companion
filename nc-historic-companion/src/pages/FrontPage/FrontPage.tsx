import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';

interface FrontPageProps {
    title: string;
    description: string;
    image: string;
    first_location: { [key: string]: any };
}

const FrontPage: FC<FrontPageProps> = ({ title, description, image, first_location }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/first_location');
    };

    return (
        <div className="front-page">
            <h1 className="title">{title}</h1>
            <img className="image" src={image} alt={title} />
            <p className="description">{description}</p>
            <button className="start-button" onClick={handleButtonClick}>
                Start Tour
            </button>
        </div>
    );
};

export default FrontPage;