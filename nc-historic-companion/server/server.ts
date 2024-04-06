import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import router from './routes/api.ts'; // Import router
import ApiCtrl from './controllers/api.ts'; // Import API methods
// import {apiCtrl} from "./routes/api.ts";

const app = express();
const port = process.env.PORT || 5000; // Change this to the port your client is running on

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const apiCtrl = new ApiCtrl(); // Create an instance of the API controller
app.use(express.json());
app.use(cors());
app.use('/api', router);


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