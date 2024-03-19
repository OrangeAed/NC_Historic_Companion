"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var url_1 = require("url");
var path_1 = require("path");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_1.dirname)(__filename);
var app = express();
app.use(bodyParser.json());
app.use(cors());
// Define the path to the tours.json file
var toursPath = path.join(__dirname, 'tours.json');
// Handle GET requests for the tours
app.get('/api/tours', function (req, res) {
    fs.readFile(toursPath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading tours.json:', err);
            res.status(500).json({ error: 'Error reading tours.json' });
        }
        else {
            console.log('Data from tours.json:', data);
            res.json(JSON.parse(data));
        }
    });
});
app.post('/api/tours', function (req, res) {
    console.log('Received data:', req.body);
    fs.readFile(toursPath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading tours.json:', err);
            res.status(500).send('Error reading tours.json');
        }
        else {
            var tours = JSON.parse(data);
            var sanitizedTitle = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            if (tours[sanitizedTitle]) {
                console.error('A tour with this title already exists. Please choose a different title.');
                res.status(400).send('A tour with this title already exists. Please choose a different title.');
            }
            else {
                tours[sanitizedTitle] = req.body;
                fs.writeFile(toursPath, JSON.stringify(tours), 'utf8', function (err) {
                    if (err) {
                        console.error('Error writing to tours.json:', err);
                        res.status(500).send('Error writing to tours.json');
                    }
                    else {
                        console.log('Tour created successfully');
                        res.send('Tour created successfully');
                    }
                });
            }
        }
    });
});
app.listen(3000, function () { return console.log('Server listening on port 3000'); });
