const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const twitSchema = new Schema({
    account: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    liked: [],
    comment: [
        {
            idUser: String,
            comment: String
        }
    ]
});

const Twit = mongoose.model('Twit', twitSchema);
module.exports = Twit;