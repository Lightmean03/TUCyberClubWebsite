const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
    date: {Date, default: Date.now}

});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;