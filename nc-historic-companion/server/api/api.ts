import { TourObject } from '../models/tour';

export const getAllTours = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/tours',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (!response.ok) {
            throw new Error('Failed to get tours');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        // throw error;
    }
}

export const getTour = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:5000/api/tours/${id}`);
        if (!response.ok) {
            throw new Error('Failed to get tour');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const deleteTour = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:5000/api/tours/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete tour');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const addTour = async (newTour: TourObject) => {
    const formData = new FormData();
    formData.append('id', newTour.id);
    formData.append('title', newTour.title);
    formData.append('description', newTour.description);
    if (newTour.image) {
        formData.append('image', newTour.image);
    }
    if (newTour.audio) {
        formData.append('audio', newTour.audio);
    }

    try {
        const response = await fetch('http://localhost:5000/api/tours', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add tour');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const addTourLocation = async (tourId: string, locationId: string, location: any) => {
    const formData = new FormData();
    formData.append('id', locationId);
    formData.append('title', location.title);
    formData.append('description', location.description);
    formData.append('components', JSON.stringify(location.components));
    if (location.image) {
        formData.append('image', location.image);
    }
    if (location.audio) {
        formData.append('audio', location.audio);
    }

    try {
        const response = await fetch(`http://localhost:5000/api/tours/${tourId}/locations`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add location');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}