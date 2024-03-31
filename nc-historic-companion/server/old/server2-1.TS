import * as express from 'express';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define the path to the tours.json file
const toursPath = path.join(__dirname, 'tours.json');

// Handle GET requests for the tours
app.get('/api/tours', (req: Request, res: Response) => {
    fs.readFile(toursPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tours.json:', err);
            res.status(500).json({ error: 'Error reading tours.json' });
        } else {
            console.log('Data from tours.json:', data);
            res.json(JSON.parse(data));
        }
    });
});

app.post('/api/tours', (req: Request, res: Response) => {
    console.log('Received data:', req.body);
    fs.readFile(toursPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tours.json:', err);
            res.status(500).send('Error reading tours.json');
        } else {
            const tours = JSON.parse(data);
            const sanitizedTitle = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            if (tours[sanitizedTitle]) {
                console.error('A tour with this title already exists. Please choose a different title.');
                res.status(400).send('A tour with this title already exists. Please choose a different title.');
            } else {
                tours[sanitizedTitle] = req.body;
                fs.writeFile(toursPath, JSON.stringify(tours), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to tours.json:', err);
                        res.status(500).send('Error writing to tours.json');
                    } else {
                        console.log('Tour created successfully');
                        res.send('Tour created successfully');
                    }
                });
            }
        }
    });
});
app.listen(3000, () => console.log('Server listening on port 3000'));