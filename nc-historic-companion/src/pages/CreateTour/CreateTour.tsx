import React, { FC, useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';

const { Title } = Typography;

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

const CreateTour: FC = () => {
    const [tourData, setTourData] = useState<TourData>({
        title: '',
        description: '',
        image: '',
        locations: {},
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTourData({
            ...tourData,
            [event.target.name]: event.target.value,
        });
    };

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

    const handleSubmit = async () => {
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
            },
        };

        try {
            const response = await fetch('/api/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tourDataWithLocations),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Tour added successfully:', data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

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