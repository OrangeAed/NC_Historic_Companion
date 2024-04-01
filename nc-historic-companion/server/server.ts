import express, { Request, Response } from 'express';
import cors from "cors";
import router from './routes/api.ts'; // Import API routes


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api', router);

// Define your routes here
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});