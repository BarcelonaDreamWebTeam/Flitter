'use strict';

const express = require('express');
const router = express.Router();
const createError = require('http-errors');


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
  res.send('example of protected request');
});


//POST
router.post ('/', verifyToken, async (req, res, next) => {
    try{
    
    }catch(err){
        next(err)
    }
})


module.exports = router
