const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const user = mongoose.model('user', userSchema);
module.exports = user;
