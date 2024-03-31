import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

// Define the structure of the location data
interface LocationData {
    title: string;
    description: string;
    text: string;
    image: string;
    location: string;
}

// Define the structure of the tour data
interface TourData {
    title: string;
    description: string;
    image: string;
    locations: Record<string, LocationData>;
}

app.use(express.static(path.resolve(__dirname, '../frontend/dist')));
app.use(express.json());

app.get('/tours', (res: Response) => {
    // fs.readFile('tours.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Error reading tours.json');
    //         return;
    //     }
    //     res.json(JSON.parse(data));
    // });

});

app.post('/tours', (req: Request, res: Response) => {
    fs.readFile('tours.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
            return;
        }
        const tours: Record<string, TourData> = JSON.parse(data).tours; // Adjusted the type of tours
        const newTour = req.body;
        tours[newTour.title] = newTour; // Add the new tour to the tours object
        fs.writeFile('tours.json', JSON.stringify({ tours }, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to tours.json');
                return;
            }
            res.status(201).json(newTour);
        });
    });
});

app.delete('/tours/:id', (req: Request, res: Response) => {
    const tourId = req.params.id;
    fs.readFile('tours.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading tours.json');
            return;
        }
        const tours: Record<string, TourData> = JSON.parse(data).tours; // Adjusted the type of tours
        if (!tours[tourId]) {
            res.status(404).send('Tour not found');
            return;
        }
        delete tours[tourId]; // Delete the tour from the tours object
        fs.writeFile('tours.json', JSON.stringify({ tours }, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to tours.json');
                return;
            }
            res.status(204).send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});