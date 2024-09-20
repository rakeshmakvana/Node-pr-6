const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const Auth = mongoose.model('authentication', authSchema);

module.exports = Auth;