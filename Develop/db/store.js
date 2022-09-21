class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write() {
        return readFileAsync('db/db.json', 'utf8');
    }
}