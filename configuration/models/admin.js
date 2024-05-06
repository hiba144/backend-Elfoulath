const mongoose = require('mongoose');

const admin = mongoose.model('admin', {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String
    }
});

module.exports = admin;
