const cors = require('cors');
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: function( origin, callback) {
        if(allowedOrigins.includes(origin) || !origin){
            // allow access if the origin is in the allowed origins list OR origin is self
            callback(null, true);
        }else{
            callback(new Error('Server does not talk to this domain.'));
        }
    },
    methods: [ 'GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}

module.exports = corsOptions;