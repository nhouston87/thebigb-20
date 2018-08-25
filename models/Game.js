const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  hero: {
    name: {
      type: String,
      default: 'Aden'
    },
    level: {
      type: Number,
      default: 1
    },
    experience: {
      type: Number,
      default: 0
    },
    healthcur: {
      type: Number,
      default: 100
    },
    healthmax: {
      type: Number,
      default: 100
    },
    magiccur: {
      type: Number,
      default: 100
    },
    magicmax: {
      type: Number,
      default: 100
    },
    attack: {
      type: Number,
      default: 20
    },
    deffense: {
      type: Number,
      default: 10
    },
    specialatk: {
      type: Number,
      default: 30
    },
    specialdef: {
      type: Number,
      default: 20
    },
    activespecmoves: {
      type: [String],
      default: []
    },
    equiped: {
      sword: {
        type: String,
        default: 'Dull Sword'
      },
      sheild: {
        type: String,
        default: 'Wood Shield'
      },
      helm: {
        type: String,
        default: 'Rusty Helm'
      },
      armor: {
        type: String,
        default: 'Leather Armor'
      }
    },
    gold: {
      type: Number,
      default: 0
    }
  },
  game: {
    chapter: {
      type: Number,
      default: 1
    },
    level: {
      type: Number,
      default: 1
    },
    monstercount: {
      type: Number,
      default: 0
    },
    items: {
      type: [String],
      default: []
    },
    equipment: {
      type: [String],
      default: []
    },
    specialmoves: {
      type: [String],
      default: []
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('game', GameSchema);
