import React, { FC, useState } from 'react';
import { addTour } from "../../../../api/api";
import './CreateTour.css';

const CreateTour: FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | undefined>(undefined);
    const [audio, setAudio] = useState<File | undefined>(undefined);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await addTour({
                id: title,
                title: title,
                description: description,
                image: image,
                audio: audio,
                locations: {}
            });
            console.log('Tour added successfully', result);
        }
        catch (error) {
            console.error('Error adding tour', error);
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAudio(event.target.files[0]);
        }
    };

    return (
        <div className="container">
            <form>
                <div className="field" tabIndex={1}>
                    <label htmlFor="title">
                        <i className="far fa-edit"/>Tour Title
                    </label>
                    <input id="title"
                           name="title"
                           type="text"
                           placeholder="e.g. Scenic Route around the Waterfall"
                           required
                           autoComplete="on"
                           onChange={handleTitleChange}
                    />
                </div>
                <div className="field" tabIndex={2}>
                    <label htmlFor="description">
                        <i className="far fa-edit"/>Description
                    </label>
                    <input id="description"
                           name="description"
                           type="text"
                           placeholder="type here"
                           required
                           autoComplete="on"
                           onChange={handleDescriptionChange}
                    />
                </div>
                <div className="field" tabIndex={3}>
                    <label htmlFor="image">
                        <i className="far fa-file-image"></i>Image
                    </label>
                    <input id="image" type="file" onChange={handleImageChange}></input>
                </div>
                <div className="field" tabIndex={4}>
                    <label htmlFor="audio">
                        <i className="fas fa-file-audio"></i> Audio File
                    </label>
                    <input id="audio" type="file" onChange={handleAudioChange}></input>
                </div>
                <button type="submit" onClick={handleSubmit}>Add Tour</button>
            </form>
        </div>
    );
};

export default CreateTour;