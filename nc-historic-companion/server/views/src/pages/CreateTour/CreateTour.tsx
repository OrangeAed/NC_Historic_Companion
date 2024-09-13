import React, { FC, useState } from 'react';
import { addTour } from "../../../../api/api";
import './CreateTour.css';

const CreateTour: FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | undefined>(undefined);
    // const [imageName, setImageName] = useState<string | null>(null);
    const [audio, setAudio] = useState<File | undefined>(undefined);
    // const [audioName, setAudioName] = useState<string | null>(null);


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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
            // setImageName(event.target.files[0].name);
        }
    };

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAudio(event.target.files[0]);
            // setAudioName(event.target.files[0].name);
        }
    };

    return (
        <div className="container">
            <form>
                <div className="field" tabIndex={1}>
                    <label htmlFor="username">
                        <i className="far fa-file-alt"></i>Tour Title
                    </label>
                    <input name="username" type="text" placeholder="e.g. Scenic Route around the Waterfall" required></input>
                </div>
                <div className="field" tabIndex={2}>
                    <label htmlFor="message">
                        <i className="far fa-edit"></i>Description
                    </label>
                    <textarea name="message" placeholder="type here" required></textarea>
                </div>
                <div className="field" tabIndex={3}>
                    <label htmlFor="message">
                        <i className="far fa-file-image"></i>Image
                    </label>
                    <input type="file" onChange={handleImageChange} ></input>
                </div>
                <div className="field" tabIndex={4}>
                    <label htmlFor="file">
                        <i className="fas fa-file-audio"></i> Audio File
                    </label>
                    <input type="file" onChange={handleAudioChange} ></input>

                </div>
                <button type="submit" onClick={handleSubmit}>Add Tour</button>
            </form>
        </div>
    );
};

export default CreateTour;