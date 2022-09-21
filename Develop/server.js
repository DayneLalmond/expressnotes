const express = require('express');
const path = require('path');
const fs = require('fs');
const pulls = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
// the url is encoded by adding key value pairs to the url in one jsonified
// extended = true because it keeps the data type instead of reading it only as a string
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.send('/notes');
//   });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    // to send just a P tag it will send this
    // res.send('<p>TESTING THIS OBJECT</p>')
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

// Fallback route
app.get('*', (req, res) =>
res.send('<h1>404</h1><a href="http://localhost:3001"><button>Home</button></a>'
));
//=======================================

// Here i need a get method to get the data
// something like this 
app.get('/notes', (req, res) => res.json(pulls));

// post method for creating notes and saving on the request body
// app.post('/notes', (req, res) => {
//     console.info(`${req.method} request made`);
//     // res.json(note)

//     let response;

// });