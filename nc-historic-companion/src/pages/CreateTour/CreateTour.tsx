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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileName = `${tourData.title}.${file.name.split('.').pop()}`;
            setTourData({
                ...tourData,
                image: `path/to/images/${fileName}`,
            });
        }
    };

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileName = `${tourData.title}.${file.name.split('.').pop()}`;
            setTourData({
                ...tourData,
                audio: `path/to/audio/${fileName}`,
            });
        }
    };

    const handleSubmit = async () => {
        tourData.id = tourData.title.toLowerCase().replace(/ /g, '_');
        if (!tourData.title || !tourData.description || !tourData.image || !tourData.audio || !tourData.id) {
            console.error('Missing required tour data:', tourData);
            return;
        }


        const formData = new FormData();
        formData.append('title', tourData.title);
        formData.append('id', tourData.id);
        formData.append('description', tourData.description);
        formData.append('image', tourData.image);
        formData.append('audio', tourData.audio);

        // Convert formData to TourData object
        const tourDataObject: TourData = {
            title: formData.get('title') as string,
            id: formData.get('id') as string,
            description: formData.get('description') as string,
            image: formData.get('image') as string,
            audio: formData.get('audio') as string,
            locations: {}, // You might need to handle this according to your requirements
        };

        try {
            const response = await addTour(tourDataObject);
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
                    <Input type="file" id="image" name="image" onChange={handleImageChange} />
                </Form.Item>
                <Form.Item label="Audio" name="audio">
                    <Input type="file" id="audio" name="audio" onChange={handleAudioChange} />
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