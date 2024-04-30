import React, { FC, useState } from 'react';
import { addTour } from "../../../../../src/api/api";
import { TourData } from "../../../../../src/types.ts";
import './CreateTour.css';

const CreateTour: FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // if (!image) {
        //     alert("Please upload an image");
        //     return;
        // }
        //
        // const formData = new FormData();
        // formData.append("title", title);
        // formData.append("description", description);
        // if (image) {
        //     formData.append("image", image);
        // }
        // if (audio) {
        //     formData.append("audio", audio);
        // }
        //
        // const response = await addTour(formData);
        // if (response.status === 201) {
        //     alert("Tour added successfully");
        // } else {
        //     alert("Error adding tour");

        const newTour: TourData = {
            title,
            description,
            image: "",
            locations: {},
            audio: ""
        };
        const response = await addTour(newTour);
        // if (response.status === 201) {
        //     alert("Tour added successfully");
        // } else {
        //     alert("Error adding tour");
        // }
    };

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
        <form onSubmit={handleSubmit} className="create-tour-form">
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </label>
            <label>
                Image:
                <input type="file" onChange={handleImageChange} required/>
            </label>
            <label>
                Audio:
                <input type="file" onChange={handleAudioChange} required/>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateTour;