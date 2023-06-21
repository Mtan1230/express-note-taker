const notes = require('express').Router();
const fs = require('fs');

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => 
    err? console.log(err) : res.json(JSON.parse(data))
    );    
});

module.exports = notes;