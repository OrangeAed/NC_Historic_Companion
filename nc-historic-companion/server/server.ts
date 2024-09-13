// server/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getAllTours, getTour, addTour, deleteTour, addTourLocation } from './controllers/tour.controller.ts';

const app = express();
const port = 5000;

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

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));


app.use(bodyParser.json());

app.get('/api/tours', getAllTours);
app.post('/api/tours', upload.fields([{ name: 'image' }, { name: 'audio' }]), addTour);
app.get('/api/tours/:id', getTour);
app.delete('/api/tours/:id', deleteTour);
app.post('/api/tours/:id/locations', upload.fields([{ name: 'image' }, { name: 'audio' }]), addTourLocation);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});