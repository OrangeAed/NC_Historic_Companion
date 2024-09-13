// import needed libraries
import express from 'express';
// get express application
const app = express();
// define app port
const port = process.env.PORT || 3000;
// starts the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})