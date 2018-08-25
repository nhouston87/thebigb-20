const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Bring in Game and User models
const Game = require('../../models/Game');
const User = require('../../models/User');

// @route   GET api/game/
// @desc    Retrieve game data for logged in user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Game.findOne({ user: req.user.id })
    .then(game => {
      if(!game) {
        return res.status(400).json({ nogame: true });
      }
      res.json(game);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/game/
// @desc    Create new game for logged in user
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const gameFields = {};
  gameFields.user = req.user.id;
  // Hero game fields
  gameFields.hero = {};
  if(req.body.heroname) gameFields.hero.name = req.body.heroname;

  Game.findOne({ user: req.user.id })
    .then(game => {
      if(game){
        if(req.body.heroname) gameFields.hero.name = req.body.heroname;
        if(req.body.herolevel) gameFields.hero.level = req.body.herolevel;
        if(req.body.heroexp) gameFields.hero.experience = req.body.heroexp;
        if(req.body.herohealthcur) gameFields.hero.healthcur = req.body.herohealthcur;
        if(req.body.herohealthmax) gameFields.hero.healthmax = req.body.herohealthmax;
        if(req.body.heromagiccur) gameFields.hero.magiccur = req.body.heromagiccur;
        if(req.body.heromagicmax) gameFields.hero.magicmax = req.body.heromagicmax;
        if(req.body.heroattack) gameFields.hero.attack = req.body.heroattack;
        if(req.body.herodeffense) gameFields.hero.deffense = req.body.herodeffense;
        if(req.body.herospecialatk) gameFields.hero.specialatk = req.body.herospecialatk;
        if(req.body.herospecialdef) gameFields.hero.specialdef = req.body.herospecialdef;
        if(req.body.heroactivespecmoves) gameFields.hero.activespecmoves = req.body.heroactivespecmoves;
        if(req.body.herogold) gameFields.hero.gold = req.body.herogold;
        // Hero equiped items fields
        gameFields.hero.equiped = {};
        if(req.body.equipedsword) gameFields.hero.equiped.sword = req.body.equipedsword;
        if(req.body.equipedsheild) gameFields.hero.equiped.sheild = req.body.equipedsheild;
        if(req.body.equipedhelm) gameFields.hero.equiped.helm = req.body.equipedhelm;
        if(req.body.equipedarmor) gameFields.hero.equiped.armor = req.body.equipedarmor;
        // Game fields
        gameFields.game = {};
        if(req.body.gamechapter) gameFields.game.chapter = req.body.gamechapter;
        if(req.body.gamelevel) gameFields.game.level = req.body.gamelevel;
        if(req.body.gamemonstercount) gameFields.game.monstercount = req.body.gamemonstercount;
        if(req.body.gameitems) gameFields.game.items = req.body.gameitems;
        if(req.body.gameequipment) gameFields.game.equipment = req.body.gameequipment;
        if(req.body.specialmoves) gameFields.game.specialmoves = req.body.specialmoves;

        // Check for null values so DB does not update with defaults
        if(req.body.heroname == null) gameFields.hero.name = game.hero.name;
        if(req.body.herolevel == null) gameFields.hero.level = game.hero.level;
        if(req.body.heroexp == null) gameFields.hero.experience = game.hero.experience;
        if(req.body.herohealthcur == null) gameFields.hero.healthcur = game.hero.healthcur;
        if(req.body.herohealthmax == null) gameFields.hero.healthmax = game.hero.healthmax;
        if(req.body.heromagiccur == null) gameFields.hero.magiccur = game.hero.magiccur;
        if(req.body.heromagicmax == null) gameFields.hero.magicmax = game.hero.magicmax;
        if(req.body.heroattack == null) gameFields.hero.attack = game.hero.attack;
        if(req.body.herodeffense == null) gameFields.hero.deffense = game.hero.deffense;
        if(req.body.herospecialatk == null) gameFields.hero.specialatk = game.hero.specialatk;
        if(req.body.herospecialdef == null) gameFields.hero.specialdef = game.hero.specialdef;
        if(req.body.heroactivespecmoves == null) gameFields.hero.activespecmoves = game.hero.activespecmoves;
        if(req.body.herogold == null) gameFields.hero.gold = game.hero.gold;

        if(req.body.equipedsword == null) gameFields.hero.equiped.sword = game.hero.equiped.sword;
        if(req.body.equipedsheild == null) gameFields.hero.equiped.sheild = game.hero.equiped.sheild;
        if(req.body.equipedhelm == null) gameFields.hero.equiped.helm = game.hero.equiped.helm;
        if(req.body.equipedarmor == null) gameFields.hero.equiped.armor = game.hero.equiped.armor;

        if(req.body.gamechapter == null) gameFields.game.chapter = game.game.chapter;
        if(req.body.gamelevel == null) gameFields.game.level = game.game.level;
        if(req.body.gamemonstercount == null) gameFields.game.monstercount = game.game.monstercount;
        if(req.body.gameitems == null) gameFields.game.items = game.game.items;
        if(req.body.gameequipment == null) gameFields.game.equipment = game.game.equipment;
        if(req.body.specialmoves == null) gameFields.game.specialmoves = game.game.specialmoves;

        Game.findOneAndUpdate({ user: req.user.id }, { $set: gameFields }, { new: true })
        .then(game => res.json(game))
        .catch(err => res.status(404).json(err));
      } else {
        // Create new game
        new Game(gameFields).save().then(game => res.json(game)).catch(err => res.status(404).json(err));
      }
    })
    .catch(err => res.status(404).json(err));
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
