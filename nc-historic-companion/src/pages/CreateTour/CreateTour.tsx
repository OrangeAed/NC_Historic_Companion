import React, { FC, useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import { addTour } from '../../api/api';

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
    // handleSubmit sends a POST request to the /api/tours endpoint with the tour data when the form is submitted
    const handleSubmit = async () => {
        // Create a tourData object that includes the locations for the tour
        const tourDataWithLocations: TourData = {
            ...tourData,
            locations: {
                "location_1": {
                    title: "Location 1",
                    description: "This is the first location",
                    image: "Tour1Location1",
                },
                "location_2": {
                    title: "Location 2",
                    description: "This is the second location",
                    image: "Tour1Location2",
                },
                // Add more locations as needed
            },
        };

        try {
            const response = await addTour(tourDataWithLocations);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Tour added successfully:', data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
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