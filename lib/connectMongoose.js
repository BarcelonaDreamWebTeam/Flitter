'use strict';

const mongoose = require ('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
    console.log('error de connexion a mongo db', err);
    process.exit(1);
});

mongoose.connection.on('open', () => {
    console.log('connectado a mongo db en', mongoose.connection.name)
});

mongoose.connect('mongodb://127.0.0.1/anuncios');


module.exports = mongoose.connection;

