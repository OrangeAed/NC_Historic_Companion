import React, { FC, useState } from 'react';
import { addTour } from "../../../../../src/api/api";
import { TourData } from "../../../../../src/types.ts";
import './CreateTour.css';

const CreateTour: FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [audio, setAudio] = useState<File | null>(null);
    const [audioName, setAudioName] = useState<string | null>(null);


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
            image: imageName || "",
            locations: {},
            audio: audioName || "",
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
            setImageName(event.target.files[0].name);
        }
    };

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAudio(event.target.files[0]);
            setAudioName(event.target.files[0].name);
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