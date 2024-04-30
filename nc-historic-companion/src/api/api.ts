import {TourData, LocationData} from "../types.ts";
import {useState} from "react";


const apiUrl = 'http://localhost:5000/api';
const imageUrl = 'http://localhost:5000/public/photos/';
const audioUrl = 'http://localhost:5000/public/audio/';

export const getAllTours = async (): Promise<Record<string, TourData>> => {
    const response = await fetch(`${apiUrl}/tours`);
    const data = await response.json();
    return data.tours;
}

export const getTour = async (id: string): Promise<TourData> => {
    const response = await fetch(`${apiUrl}/tours/${id}`);
    return response.json();
}

export const addTour = async (tour: TourData): Promise<Response> => {
    const tourData = {
        title: tour.title,
        id: tour.title.toLowerCase().replace(/\s/g, '-'),
        description: tour.description,
        image: imageUrl + tour.image,
        audio: audioUrl + tour.audio,
    }
    return fetch(`${apiUrl}/tours`, {
        method: "POST",
        body: JSON.stringify(tourData),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
        .then(response => {
            console.log(response);
            return response;
        });
}
export const deleteTour = async (id: string): Promise<void> => {
    await fetch(`${apiUrl}/tours/${id}`, {
        method: 'DELETE',
    });
}