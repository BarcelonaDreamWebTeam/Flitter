'use strict';

const mongoose = require('mongoose');

//definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    nombre: {type: String, unique:true},
    venta: Boolean,
    precio: {type: Number, min:0.01, max:1000000},
    foto: String,
    tags: [String]
});

anuncioSchema.statics.lista = function(filtro, skip, limit, fields, sort) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec()
}

//crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

//exportar el modelo
module.exports = Anuncio;
