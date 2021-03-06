const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Import input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Bring in User model
const User = require('../../models/User');

// @route   POST api/users/login
// @desc    Login in users and return JWT
// @access  Public
router.post('/login', (req, res) => {
  const {errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password

  // Find user by email
  User.findOne({ email })
    .then(user => {
      if(!user) {
        errors.email = 'No user found for provided email';
        return res.status(404).json(errors);
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User Matched

            const payload = {id: user.id, email: user.email}
            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 86400 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = 'Invalid password';
            return res.status(400).json(errors);
          }
        });
    })
});

// @route   POST api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  const {errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already in use';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }

    })
});

// @route   GET api/users/current
// @desc    Get current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
});

module.exports = router;
