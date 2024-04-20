import React, { FC, useState } from 'react';
import { addTour } from "../../../../../src/api/api";
import { TourData } from "../../../../../src/types.ts";

const CreateTour: FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!image) {
            alert("Please upload an image");
            return;
        }

        const tourData: TourData = {
            title: title,
            description: description,
            id: "", // You might not have an ID yet, so you can leave it empty for now
            // You can't include the image file in the TourData object
            // because TourData expects a string for the image property, not a File object.
            // You might include a placeholder string for now, or leave it undefined.
            image: "",
            audio: "",
            locations: {}
            // Other properties of TourData...
        };

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("audio", audio);


        const response = await addTour(formData);
        if (response.status === 201) {
            alert("Tour added successfully");
        } else {
            alert("Error adding tour");
        }
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
        <form onSubmit={handleSubmit}>
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