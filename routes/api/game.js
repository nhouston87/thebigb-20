const express = require('express');
const router = express.Router();

// Bring in Game model
const Game = require('../../models/Game');

// @route   GET api/game/
// @desc    Retrieve game data for logged in user
// @access  Private
router.get('/', (req, res) => {
  res.send('Game');
});

// @route   POST api/game/
// @desc    Create new game for logged in user
// @access  Private
router.post('/', (req, res) => {

});

// @route   PUT api/game/
// @desc    Update game for currently logged in user
// @access  Private
router.put('/', (req, res) => {
  console.log('Updated user');
});

// @route   DELETE api/game/
// @desc    Delete game for currently logged in user
// @access  Private
router.delete('/', (req, res) => {
  console.log('Deleted user');
});

module.exports = router;
