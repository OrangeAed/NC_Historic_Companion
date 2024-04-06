import React, { FC, useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import { addTour } from '../../api/api.ts';
import { TourData } from "../../types.ts";

const { Title } = Typography;

const CreateTour: FC = () => {
    const [tourData, setTourData] = useState<TourData>({
        title: '',
        id: '',
        description: '',
        image: '',
        audio: '',
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
        if (!tourData.title || !tourData.description || !tourData.image) {
            console.error('Missing required tour data');
            return;
        }

        const tourDataWithLocations: TourData = {
            ...tourData,
            id: tourData.title.toLowerCase().replace(/\s/g, '_'),
            locations: {
                "location_1": {
                    title: "Location 1",
                    description: "This is the first location",
                    text: "This is the first location",
                    audio: '',
                    image: "Tour1Location1",
                },
                "location_2": {
                    title: "Location 2",
                    description: "This is the second location",
                    text: "This is the second location",
                    audio: '',
                    image: "Tour1Location2",
                },
            },
        };
        console.log('tourDataWithLocations:', tourDataWithLocations);
        try {
            const response = await addTour(tourDataWithLocations);
            if (!response.ok) {
                console.error('There was a problem with the post operation:', response);
                return;
            }
            console.log('Tour added successfully');
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