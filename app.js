//BUILT-IN IMPORTS
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./Config/dbConnect');
connectDB();
const cors = require('cors');
const corsOptions = require('./Config/corsOptions');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
//CUSTOM IMPORTS
const verifyJWT = require('./middleware/verifyJWT');
const PORT = process.env.PORT;


const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info: {
            title: "portfolio website",
            description: "This is the backend for the portfolio website of Bryan",
            contacts: {
                name: "Bryan Murasira",
                email: "bryanmurasira@gmail.com"
            },
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:4000/",
                description: "Development Server"
            }
        ],
    },
    apis: [ "./routes/*.js", "./routes/API/*.js"]
}

const specs = swaggerJsDoc(swaggerOptions);


//BUILT-IN MIDDLEWARE
app.use(cors()); //Remember to delete this line & uncomment ln46 after devt
//app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



//ROUTES
app.use( '/register', require('./routes/registration') );
app.use( '/authenticate', require('./routes/login') );
app.use( '/refresh', require('./routes/refresh') );
app.use( '/logout', require('./routes/logout') );
// app.use( '/', require('./routes/root') );

// app.use(verifyJWT); //CUSTOM MIDDLEWARE
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

//EXPORT THE APP 
module.exports = app;