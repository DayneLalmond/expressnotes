const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./db/uuid');


const app = express();
const PORT = 3001;

require('./routes/apiRoutes')(app)

app.use(express.static('public'));
app.use(express.json());
// the url is encoded by adding key value pairs to the url in one jsonified
// extended = true because it keeps the data type instead of reading it only as a string
app.use(express.urlencoded({ extended: true }))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// Fallback route
app.get('*', (req, res) =>
    res.send('<h1>404</h1><a href="http://localhost:3001"><button>Home</button></a>'
    ));
//=======================================

// Post route to add notes with the uuid included
app.post('/api/notes', function (req, res) {

    let notes = fs.readFileSync('./db/db.json', 'utf8')
    notes = JSON.parse(notes)

    const { title, text } = req.body
    const addedNote = {
        id: uuid(),
        title: title,
        text: text
    }
    notes.push(addedNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    //res.end will end the request
    res.end()
})

app.delete('/api/notes/:id', function (req, res) {
    let notes = fs.readFileSync('./db/db.json', 'utf8')
    notes = JSON.parse(notes)

    for (let i = 0; i < notes.length; i++) {
        //only problem is it deletes all the notes
    notes.splice(i)
    };
    
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.end()
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);