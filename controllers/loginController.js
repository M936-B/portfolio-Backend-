const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authorize = async( req, res) => {
    const { eml, pwd} = req.body;
    if( !eml || !pwd) return res.status(400).json({"message": "Problem with request body."});

    const authUser = await User.findOne({ email: eml});
    if( !authUser) return res.status(404).json({"message": "This user's email is NOT registered."});

    const correctPassword = await bcrypt.compare( pwd, authUser.password);
    if(correctPassword){
        const accessToken = jwt.sign(
            { name: authUser.firstName, email: authUser.email, roles: Object.values(authUser.roles)},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50s', issuer: "portfolio-server" }
        );
        const refreshToken = jwt.sign(
            { userId: authUser.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d', issuer: "portfolio-server" }
        );
        authUser.refreshToken = refreshToken;
        await authUser.save();
        
        res.cookie( "refreshToken", refreshToken ,{
            httpOnly: true,
            sameSite: 'none',
            domain: 'bryanmurasira.netlify.app.com',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000} //'add secure: true,' in the options when you stop using thunder client
        );
        res.json({accessToken});
    } else {
        res.status(401).json({"message": "Incorrect Password."});
    }
}


module.exports = {authorize}