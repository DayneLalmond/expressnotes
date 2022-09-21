const express = require('express');

const router = express.Router();

router
    .route('/notes')
    .get('/notes', (req, res) => {console.info(`${req.method} request made`)})    

    .post('/notes/:id', (req, res) => {console.info(`${req.method} request made`)
    })

module.exports = router

// router.get('/notes', (req, res) => {
//     let savedNotes = notes;
//     res.json(savedNotes)