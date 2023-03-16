const jwt = require('jsonwebtoken');


const verifyJWT = ( req, res, next) => {
    const authHeader = req.headers.authorization || req.header.Authorization;
    if(!authHeader) return res.status(400).json({"message": "Missing the authorization header"});

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(401).json({"message": "Problem with authentication the access token"});
            req.name =  decoded.name;
            req.email =  decoded.email;
            req.roles = decoded.roles;
            next();
        }
    );
}


module.exports = verifyJWT