// api.ts (or api.js)

interface LocationData {
    title: string;
    description: string;
    image: string;
}

interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
}


async function fetchTours() {
    try {
        const response = await fetch('/api/tours');
        if (!response.ok) {
            throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        return data.tours;
    } catch (error) {
        console.error(error);
        // Handle
        console.error('Error: Failed to fetch tours')
    }
}


async function addTour(newTour: TourData) {
    try {
        const response = await fetch('/api/tours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tour: newTour }),
        });
        if (!response.ok) {
            throw new Error('Failed to add tour');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        // Handle error
        console.error('Error: Failed to add tour')
    }
}


async function deleteTour(tourId: string) {
    try {
        const response = await fetch(`/api/tours/${tourId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete tour');
        }
    } catch (error) {
        console.error(error);
        // Handle error
        console.error('Error: Failed to delete tour');
    }
}

export { fetchTours, addTour, deleteTour };
