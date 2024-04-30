import {TourData, LocationData} from "../types.ts";
import {useState} from "react";


const apiUrl = 'http://localhost:5000/api';

export const getAllTours = async (): Promise<Record<string, TourData>> => {
    const response = await fetch(`${apiUrl}/tours`);
    const data = await response.json();
    return data.tours;
}

export const getTour = async (id: string): Promise<TourData> => {
    const response = await fetch(`${apiUrl}/tours/${id}`);
    return response.json();
}

export const addTour = async (tour: TourData): Promise<void> => {
    // console.log('tour:', tour)
    // return await fetch(`${apiUrl}/tours`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(tour),
    // });
    const tourData = {
        title: tour.title,
        description: tour.description,
        id: tour.title.toLowerCase().replace(/\s/g, '-'),
    }
    fetch(`${apiUrl}/tours`, {
        method: "POST",
        body: JSON.stringify(tourData),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
    .then(response => response.json())
    .then(json => console.log(json));

}

export const deleteTour = async (id: string): Promise<void> => {
    await fetch(`${apiUrl}/tours/${id}`, {
        method: 'DELETE',
    });
}