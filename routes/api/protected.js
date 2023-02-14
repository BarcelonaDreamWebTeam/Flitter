'use strict';

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Tweet= require('../../models/Tweet')
const User = require('../../models/User');



//authentication: to be called when we need authorization (user must me logged in)
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).send({ message: "No token provided." });
  }
  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, "secret", (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "Invalid token." });
    }
    req.userId = decoded.userId;
    next();
  });
}

// GET 
router.get('/', verifyToken, function(req, res, next) {
  res.status(200).send({ userId: req.userId });
  // res.send('example of protected request');
});


//POST
router.post ('/', verifyToken, async (req, res, next) => {
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

})



module.exports = router
