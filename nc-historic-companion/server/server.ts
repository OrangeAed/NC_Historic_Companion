import express, { Request, Response } from 'express';
import cors from "cors";
import router from './routes/api.ts'; // Import router
// import ApiCtrl from './controllers/api.ts'; // Import API methods
import {apiCtrl} from "./routes/api.ts";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api', router);


app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; img-src 'self'; script-src 'self'; style-src 'self';");
    next();
});

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