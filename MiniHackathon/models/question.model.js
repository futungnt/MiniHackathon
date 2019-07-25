const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: [String],
    score: [[Number]],
});

const GameModel = mongoose.model('Player', GameSchema);

module.exports = GameModel;