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
        const response = await fetch('/api/tours');
        const data = await response.json();

        // Check if the tour title already exists
        if (data.tours[tourData.title]) {
            message.error('A tour with this title already exists. Please choose a different title.');
            return;
        }

        // If the tour title is unique, send the POST request
        fetch('/api/tours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tourData),
        });
    };

    // The return statement renders the form for creating a new tour
    return (
        <div>
            <Title level={1}>Create Tour</Title>
            {/* The onFinish prop is called when the form is successfully validated and submitted */}
            <Form onFinish={handleSubmit}>
                {/* Each Form.Item component wraps a form field */}
                <Form.Item label="Title">
                    <Input name="title" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="description" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Image">
                    <Input type="file" name="image" onChange={handleFileChange} />
                </Form.Item>
                {/* Add fields for locations */}
                <Form.Item>
                    {/* The Button component is used for the submit button */}
                    <Button type="primary" htmlType="submit">
                        Create Tour
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateTour;