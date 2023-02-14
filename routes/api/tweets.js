'use strict';

const express = require('express')
const router = express.Router();
const Tweet= require('../../models/Tweet')


router.get('/', async (req, res, next) => {
    try {
        // filtros
        const user = req.query.user;
        const tweet_id = req.query.tweet_id;
        const text = req.query.text;
        const hashtags = req.query.hashtags;
        const date = req.query.date;
        const likes = req.query.likes;


        const filtro = {};

        if (user) {
            filtro.user = new RegExp("^" + user, "i");
        }

        if (tweet_id) {
            filtro.tweet_id = tweet_id
        }

        if (hashtags) {
            filtro.hashtags = new RegExp("^" + hashtags, "i");
        }

        if(text) {
            filtro.text = new RegExp("^" + text, "i");
        }


        // paginacion
        const skip = req.query.skip;
        const limit = req.query.limit;

        // selection  de campos
        const fields = req.query.fields;

        //sort
        const sort = req.query.sort;

        const tweets = await Tweet.lista(filtro, skip, limit, fields, sort);
        res.json({ results: tweets });
    } catch(err) {
        next(err);
    }
});



//GET/api/tweets/(id)
//devuelve un solo tweet

router.get('/:id', async(req, res , next)=> {

    try{ 
        const id = req.params.id;
    
        //buscar un tweet en la BD
        const tweet = await Tweet.findById(id);

        res.json({result: tweet})

    }catch (err) {
        next(err);
    }

})

//PUT/api/tweets/(id) (body=agenteData)
//Actualizar un tweet

router.put('/:id', async(req, res, next) =>{

    try {
        const id = req.params.id; 
        const tweetData= req.body;

        const TweetModificado = await Tweet.findOneAndUpdate({_id: id}, tweetData, {
            new: true //esto hace que nos devuelva el documento actualizado en el postman
        });

        res.json({result: TweetModificado});
        
    } catch (err) {
        next(err);
    }
})

//POST/api/tweets (body=agenteData)
//Crear tweet

router.post('/', async(req, res, next) =>{

    try {
        const tweetData = req.body;

        //instanciar un nuevo agente en memoria 
        const tweet = new Tweet(tweetData);

        //guardarlo en base de datos
        const tweetSaved = await tweet.save();

        //responder
       res.json({result: tweetSaved});
        
    } catch (err) {
        next(err); 
    }
});

//POST/api/tweets/:id (body=agenteData)
//Eliminar Tweet

router.delete('/:id', async(req, res, next) =>{

    try {
        const id = req.params.id; 

            const tweet = await Tweet.findById(id);
            if (!tweet) {
                const err = new Error('not found') //Se podria quitar
                err.status = 404;
                next(err);
                return ; //para que no se jecute el codigo siguiente
            }

         await Tweets.deleteOne({_id: id});
       

        res.json();
        
    } catch (err) {
        next(err); 
    }
});



//Exportando modulo

module.exports = router ; 