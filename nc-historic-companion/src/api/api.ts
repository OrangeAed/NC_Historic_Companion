// api.ts
export const getAllTours = async () => {
    const response = await fetch('http://localhost:5000/tours');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const addTour = async (tourData: any) => {
    const response = await fetch('http://localhost:5000/tours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
};

export const getTour = async (id: string) => {
    const response = await fetch(`http://localhost:5000/tours/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const deleteTour = async (id: string) => {
    const response = await fetch(`http://localhost:5000/tours/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};