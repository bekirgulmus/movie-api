const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxLength: 60,
        minLength: 2
    },
    surname: {
        type: String,
        maxLength: 60,
        minLength: 2
    },
    bio: {
        type: String,
        maxLength: 1000,
        minLength: 60
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director',DirectorSchema);