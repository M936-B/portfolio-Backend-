const User = require('../models/User');
const jwt = require('jsonwebtoken');

const renew = async( req, res) => {

    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) return res.sendStatus(401);
        const refreshToken = cookies.refreshToken;
        console.log(refreshToken);
        
        const bearer = await User.findOne( {refreshToken: refreshToken}).exec();
        if( !bearer) return res.sendStatus(404); //forbidden
        
        
        //evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, user) => {
                if(err || bearer.id !== user.userId) return res.sendStatus(403)
                const roles = Object.values(bearer.roles);
                const accessToken = jwt.sign(
                    { name: user.firstName, email: user.email, roles: roles},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s'}
                );
                res.status(200).json({accessToken})
            }
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"message": "Internal server error"})
    }
}


module.exports = {renew}