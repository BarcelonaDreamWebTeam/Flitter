'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};


//reset password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  return token;
};

userSchema.methods.generatePasswordReset = function () {
  this.passwordResetToken = crypto.randomBytes(20).toString('hex');
  this.passwordResetExpires = Date.now() + 3600000; // expires in an hour
};

userSchema.statics.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    if (!password) {
      return reject(new Error('Password is required'));
    }
    if (password.length < 8) {
      return reject(new Error('Password must be at least 8 characters long'));
    }
    if (!/\d/.test(password)) {
      return reject(new Error('Password must contain at least one number'));
    }
    if (!/[a-z]/.test(password)) {
      return reject(new Error('Password must contain at least one lowercase letter'));
    }
    if (!/[A-Z]/.test(password)) {
      return reject(new Error('Password must contain at least one uppercase letter'));
    }
    return resolve();
  })};

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

userSchema.statics.validateEmail = function (email) {
  if (!email) {
    return Promise.reject(new Error("Email is required"));
  }
  if (!emailRegex.test(email)) {
    return Promise.reject(new Error("Invalid email format"));
  }

  return this.findOne({ email: email }).then((user) => {
    if (user) {
      return Promise.reject(new Error("Email already exists"));
    }
    return Promise.resolve();
  });
};

userSchema.statics.validateUsername = function (username) {
  if (!username) {
    return Promise.reject(new Error("Username is required"));
  }

  return this.findOne({ username: username }).then((user) => {
    if (user) {
      return Promise.reject(new Error("Username already exists"));
    }
    return Promise.resolve();
  });
};


const User = mongoose.model('User', userSchema);

module.exports = User;
