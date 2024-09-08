import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import router from './routes/api.ts'; // Import router
import ApiCtrl from './controllers/api.ts'; // Import API methods
import multer from 'multer';

const app = express();
const port: string | number = process.env.PORT || 5000; // Change this to the port your client is running on

const apiCtrl = new ApiCtrl(); // Create an instance of the API controller
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/public', express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/photos/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send('File uploaded successfully.');
});

// app.post('/api/tours', upload.single('image'), (req: Request, res: Response) => {
//     // req.files is an object where fieldname is the key and the value is an array of files
//     // You can access uploaded files with req.files['fieldname']
//     // Your existing code to handle the POST request goes here
//
// });

app.use(function(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
})

// Define your routes here
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.get('/tours', apiCtrl.getAllTours);
app.get('/tours/:id', apiCtrl.getTour);
app.post('/tours', apiCtrl.addTour);
app.delete('/tours/:id', apiCtrl.deleteTour);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});