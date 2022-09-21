class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8').then(function(data) {
            notes = [].concat(JSON.parse(data))
            res.json(notes);
        })
    }
    write() {
        return readFileAsync('db/db.json', 'utf8');
    }
}