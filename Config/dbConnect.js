require('dotenv').config();
const mongoose = require('mongoose'); //import mongoose

const connectDB = async () => { //create the async function for connecting to the db using the DATABASE_URI in .env
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;