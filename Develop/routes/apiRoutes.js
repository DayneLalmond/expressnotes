const fs = require('fs')

module.exports = (app) => {
    app.get('/api/notes', function (req, res) {
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) throw err
            res.send(data)
        })
    })
}