const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Post', postSchema);