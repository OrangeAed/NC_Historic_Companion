// src/pages/TourView/TourView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTour } from '../../../../../src/api/api';
import { TourData } from '../../../../../src/types';
import LocationCard from '../../components/LocationCard/LocationCard';
import TourCard from '../../components/TourCard/TourCard';
import './TourView.css';

type TourViewProps = Record<string, string>;

const TourView: React.FC = () => {
    const { tourId } = useParams<TourViewProps>();
    const [data, setData] = useState<TourData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (!tourId) {
            return;
        }

        getTour(tourId)
            .then(response => {
                setData(response);
                setIsLoading(false);
            });
    }, [tourId]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/api/upload', { // Updated port to 5000
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully');
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const locationsArray = Object.values(data?.locations || {});

    return (
        <div>
            <div>
                <h1>Locations for {tourId}</h1>
            </div>
            <div>
                <div>
                    {locationsArray.length > 0 && (
                        <div>
                            {tourId && <TourCard tour={tourId} />}
                        </div>
                    )}
                </div>
                <div className="location-cards-container">
                    {locationsArray.map((location, index) => (
                        <div key={index}>
                            <h2>Tour {tourId} Location {index + 1}</h2>
                            <LocationCard location={location} />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload Image</button>
            </div>
        </div>
    );
};

export default TourView;