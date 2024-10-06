import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import {
    getAllTours,
    getTour,
    addTour,
    deleteTour,
    addTourLocation,
    deleteTourLocation
} from './controllers/tour.controller.ts';

const app = express();
const port = 5000;

const corsOptions = {
    origin: '*', // Allow requests from any origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, 'public/photos/');
        } else if (file.fieldname === 'audio') {
            cb(null, 'public/audio/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.get('/api/tours', getAllTours);
app.post('/api/tours', upload.fields([{name: 'image'}, {name: 'audio'}]), addTour);
app.get('/api/tours/:id', getTour);
app.delete('/api/tours/:id', deleteTour);
app.post('/api/tours/:id/locations', upload.fields([{name: 'image'}, {name: 'audio'}]), addTourLocation);
app.delete('/api/tours/:tourId/locations/:locationId', deleteTourLocation);

app.listen(port, 'localhost', () => {
    console.log(`Server is running on http://localhost:${port}`);
});