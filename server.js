require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./Config/dbConnect');
connectDB();
const PORT = process.env.PORT;

//MIDDLEWARE

//ROUTES

//ADDRESS ERROR HANDLING
app.all('*', ( req, res )=>{
    if(req.accepts('html')){
        res.status(404).sendFile(path.join( __dirname, 'views', '404.html'));
    } else if(req.accepts('json')){
        res.json({'error': '404 Not Found.'})
    } else {
        res.type('txt').send('404 Not Found.')
    }
});


mongoose.connection.once('open', () => {
    console.log("[DATABASE] Connected");
    app.listen( PORT, () => {
        console.log(`[SERVER] RUNNING ON PORT: ${PORT}`);
    });
});
