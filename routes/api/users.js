const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');


const router = express.Router();

router.post('/signup', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save((err) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
    const token = jwt.sign({
      userId: user._id
    }, 'secret');
    return res.status(200).send({
      token: token,
      user: user
    });
  });
});


// POST /api/users/login
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(400).send({
          message: "An error occured while searching for the user."
        });
      }
      if (!user) {
        return res.status(404).send({
          message: "User not found."
        });
      }
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (error) {
          return res.status(400).send({
            message: "An error occured while comparing the passwords."
          });
        }
        if (!isMatch) {
          return res.status(401).send({
            message: "Incorrect password."
          });
        }
        const token = jwt.sign({ userId: user._id }, "secret");
  
        return res.status(200).send({
          token: token,
          user: user
        });
      });
    });
  });
  

module.exports = router;
