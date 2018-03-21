const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.send([
        { name: 'Alexandr', age: 27 },
        { name: 'Tanya', age: 30 },
        { name: 'Arina', age: 1 }
    ]);
});

app.listen(3000, () => {
    console.log('The server is working on port 3000');
});

module.exports.app = app;