const mongoose = require('mongoose');

const role = new mongoose.Schema({
    value: { type: String, unique: true, default: 'USER' },
});

module.exports = mongoose.model('role', role);
