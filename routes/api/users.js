const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const router = express.Router();

router.post('/signup', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    passwordResetToken: '',
    passwordResetExpires: ''
  });

  try {
    await User.validateUsername(user.username);
    await User.validateEmail(user.email);
    await User.validatePassword(user.password);

    await user.save();

    const token = jwt.sign({
      userId: user._id
    }, 'secret');

    return res.status(200).send({
      token: token,
      user: user
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
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



router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
     // Verify that the email exists in the database
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).send({ error: 'No account with that email address exists.' });
      }

    // Generate a password reset token and save it to the database
    user.generatePasswordReset();
    await user.save();


    // Send an email to the user with a link to reset their password
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'treva.stracke@ethereal.email',
        pass: 'JTpCcxFQdShhfgrEQx'
      }
    });

    let info = await transporter.sendMail({
      from: 'Flitter <noreply@flitter.com>',
      to: email,
      subject: 'Password Reset',
      text: 'Click the link below to reset your password:\n\n' +
        'http://localhost:3015/api/users/reset-password/' + user.passwordResetToken,
      html: '<p>Click the link below to reset your password:</p>' +
        '<p><a href="http://localhost:3015/api/users/reset-password/' + user.passwordResetToken + '">Reset Password</a></p>'
    });
    console.log('hola2');


    res.status(200).send({ message: 'Password reset email sent.' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while processing your request.' });
  }
});


router.get('/reset-password/:token', async (req, res) => {
  const user = await User.findOne({ passwordResetToken: req.params.token });
  const passwordResetToken = req.params.token;


  if (!user) {
    return res.status(404).send('Password reset token not found.');

  }

  return res.render('reset-password', { user, passwordResetToken: passwordResetToken, successMessage: '', errorMessage: '' });
});



router.post('/reset-password', (req, res) => {
  const password = req.body.password;
  const passwordResetToken = req.body.passwordResetToken;
  const user = User.findOne({
    passwordResetToken: passwordResetToken
  });

  User.validatePassword(password)
    .then(() => {
      User.findOne({passwordResetToken: passwordResetToken}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("User not found");

        user.password = password;
        user.passwordResetToken = null;

        user.save();
        // res.render('reset-password', { passwordResetToken: passwordResetToken, successMessage: 'Password reset successfully.', errorMessage: '' });
        res.redirect("http://localhost:8080/#/login");

      });
    })
    .catch((error) => {
      return res.render("reset-password", {
        passwordResetToken: passwordResetToken,
        errorMessage: error.message,
        successMessage: ''
      });
    });
});


router.get('/:id', async(req, res , next)=> {

  try{ 
      const id = req.params.id;
  
      //buscar un tweet en la BD
      const user = await User.findById(id);

      res.json({result: user})

  }catch (err) {
      next(err);
  }

})


module.exports = router;


