require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const connectDB = require('./Config/dbConnect');
connectDB();
const PORT = process.env.PORT;


//CONNECTING TO THE DB & MAKING THE SERVER LISTEN ON A PORT
mongoose.connection.once('open', () => {
    console.log("[DATABASE] Connected");
    app.listen( PORT, () => {
        console.log(`[SERVER] RUNNING ON PORT: ${PORT}`);
    });
});