const express = require('express');
const path = require('path');
const fs = require('fs');
const pulls = require('./db/db.json');


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


// app.get('/notes/db/db.json', (req, res) => {
//     res.status(200).json(`${req.method}`)
// })

// Destruct the note variables
app.post('/api/notes', (req, res) => {

const { noteTitle, noteText } = req.body

        const addedNote = {
            noteTitle,
            noteText
        }

        readAndAppend(addedNote, './db/db.json');
    });

//         fs.readFile('./db/db.json', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 const savedNote = JSON.parse(data);

//                 savedNote.push(addedNote);


//                 fs.writeFile('./db/db.json',
//                     JSON.stringify(savedNote, null, 4),
//                     (writeErr) =>
//                         writeErr
//                             ? console.error(writeErr)
//                             : console.info('Successfully updated notes!')
//                 )
//             }
//         });

//         const response = {
//             status: 'success',
//             body: addedNote,
//         };

//         console.log(response);
//         res.status(201).json(response);
//     } else {
//         res.status(500).json('Error in posting note!');
// }});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);