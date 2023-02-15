'use strict'
const mongoose = require('mongoose');

//definiendo esquemas de los tweets

const tweetSchema = mongoose.Schema({
    
    user: {type: String},//---> para que cree un indice
    tweet_id: { type: Number} ,
    text: {type: String},
    likes: {type: Number},
    img: {type: String},
    hashtags: [],
    date: {type: Date},
    author: {type: String}
});

//METODO ESTATICO PARA FILTRAR Y MAS COSAS
tweetSchema.statics.lista = function(filtro, skip, limit, fields, sort){
    const query = Tweet.find(filtro); //esto devuelve la query sin ejecutar
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    if (sort === 'popular') {
        query.sort({ likes: 1 });
    } else {
        query.sort(sort);
    }
    
    return query.exec()//----> aqui si se ejecuta la queryy y se retorna la promesa

}



//creando modelo
const Tweet= mongoose.model('Tweet', tweetSchema);

//exportando el modelo

module.exports = Tweet;
