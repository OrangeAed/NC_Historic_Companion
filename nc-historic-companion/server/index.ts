// import needed libraries
import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes/route';

// get express application
const app = express();
// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// define app port
const port = process.env.PORT || 3000;
// starts the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})