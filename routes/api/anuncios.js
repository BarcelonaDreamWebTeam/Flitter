'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET /api/anuncios
router.get('/', async (req, res, next) => {
    try {
        // filtros
        const nombre = req.query.nombre;
        const precio = req.query.precio;
        const tags = req.query.tags;
        const venta = req.query.venta;

        const filtro = {};

        if (nombre) {
            filtro.nombre = nombre
        }

        if (precio) {
            filtro.precio = precio
        }

        if (tags) {
            filtro.tags = tags
        }

        if(venta) {
            filtro.venta = venta
        }

        // paginacion
        const skip = req.query.skip;
        const limit = req.query.limit;

        // selection  de campos
        const fields = req.query.fields;

        //sort
        const sort = req.query.sort;

        const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);
        res.json({ results: anuncios });
    } catch(err) {
        next(err);
    }
});

//GET /api/anuncios/(id)
//Devuelve un anuncio
router.get ('/:id', async (req, res, next) => {
    try{
    const id = req.params.id;

    //buscar un anuncio en DB
    const anuncio = await Anuncio.findById(id);

    res.json({result: anuncio})

    }catch(err) {
        next(err);
    }
})

//PUT /api/anuncios/(id) (body=anuncioData)
//Actualizar un anuncio
router.put ('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        const anuncioData = req.body;
        const anuncioActualizado = await Anuncio.findOneAndUpdate( {_id: id}, anuncioData, {
            new: true
        });
        res.json({result: anuncioActualizado});
    
    }catch(err){
        next(err)
    }
})



//DELETE /api/anuncios (body=anuncioData)
router.delete ('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        const anuncioNuevo = await Anuncio.deleteOne( {_id: id})
        res.json();
    
    }catch(err){
        next(err)
    }
})

//POST
router.post ('/', async (req, res, next) => {
    try{
        const anuncioData = req.body;

        const anuncio = new Anuncio(anuncioData);
        const anuncioNuevo = await anuncio.save();
        res.json({result: anuncioNuevo});
    
    }catch(err){
        next(err)
    }
})


module.exports = router