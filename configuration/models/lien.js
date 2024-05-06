const mongoose = require('mongoose');

const lienSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Lien = mongoose.model('Lien', lienSchema);

module.exports = Lien;
