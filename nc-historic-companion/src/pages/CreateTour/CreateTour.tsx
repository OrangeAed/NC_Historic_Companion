import React, { FC, useState } from 'react';
import { Button, Input, Form, Typography, message } from 'antd';

const { Title } = Typography;

// Define the structure of the location data
interface LocationData {
    title: string;
    description: string;
    image: string;
}

// Define the structure of the tour data
interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
}

// CreateTour is a functional component that allows users to create a new tour
const CreateTour: FC = () => {
    // Use the useState hook to manage the state of the tour data
    const [tourData, setTourData] = useState<TourData>({
        title: '',
        description: '',
        image: '',
        locations: {},
    });

    // handleChange updates the state of tourData when the user types into the form fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTourData({
            ...tourData,
            [event.target.name]: event.target.value,
        });
    };

    // handleFileChange updates the state of tourData when the user selects an image file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileName = `${tourData.title}.${file.name.split('.').pop()}`;
            setTourData({
                ...tourData,
                image: `path/to/images/${fileName}`,
            });
        }
    };

    // handleSubmit sends a POST request to the /api/tours endpoint with the tour data when the form is submitted
    const handleSubmit = async () => {
        // Fetch the existing tours
        fetch('http://localhost:5173/api/tours')
            .then(response => {
                if (!response) {
                    throw new Error('No response received');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType) {
                    throw new Error('No content-type received');
                } else if (contentType.includes('application/json')) {
                    return response.json();
                } else if (contentType.includes('text/html')) {
                    return response.text();
                } else {
                    throw new Error(`Invalid content-type. Expected application/json, got ${contentType}`);
                }
            })
            .then(data => {
                // If the data is a string, it means the server returned HTML
                if (typeof data === 'string') {
                    console.error('Received HTML:', data);
                    return;
                }

                // If the tour title is unique, send the POST request
                console.log('Sending data:', tourData);
                return fetch('http://localhost:5173/api/tours', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(tourData),
                });
            })
            .then(response => {
                if (!response) {
                    throw new Error('No response received');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid content-type. Expected application/json');
                }
                return response.json();
            })
            .then(data => {
                // Do something after the tour is successfully created
                // For example, clear the form fields
                setTourData({
                    title: '',
                    description: '',
                    image: '',
                    locations: {},
                });
                message.success('Tour created successfully');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
    // The return statement renders the form for creating a new tour
    return (
        <div>
            <Title level={1}>Create Tour</Title>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Title" name="title">
                    <Input id="title" name="title" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input id="description" name="description" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Image" name="image">
                    <Input type="file" id="image" name="image" onChange={handleFileChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Tour
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateTour;