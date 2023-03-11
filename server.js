//IMPORTS
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./Config/dbConnect');
connectDB();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const PORT = process.env.PORT;


//BUILT-IN MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//ROUTES
app.use( '/register', require('./routes/registration') );
app.use( '/auth', require('./routes/login') );
app.use( '/refresh', require('./routes/refresh') );
app.use( '/logout', require('./routes/logout') );
// app.use( '/', require('./routes/root') );


app.use(verifyJWT); //CUSTOM MIDDLEWARE
//API ROUTES
app.use('/posts', require("./routes/API/posts"));
app.use('/messages', require("./routes/API/messages"));
app.use('/users', require("./routes/API/users"));
// app.use('/', require("./routes/"));


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

//CONNECTING TO THE DB & MAKING THE SERVER LISTEN ON A PORT
mongoose.connection.once('open', () => {
    console.log("[DATABASE] Connected");
    app.listen( PORT, () => {
        console.log(`[SERVER] RUNNING ON PORT: ${PORT}`);
    });
});
