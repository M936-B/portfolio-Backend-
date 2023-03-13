const User = require('../models/User');


const erase = async( req, res) => {

    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) return res.sendStatus(204);
        const refreshToken = cookies.refreshToken;
        
        const bearer = await User.findOne( {refreshToken: refreshToken}).exec();
        if( !bearer) {
            res.clearCookie( 'refreshToken', {httpOnly: true, sameSite: 'none', Secure: true})
            return res.sendStatus(404); //Not Found
        }
        bearer.refreshToken = '';
        await bearer.save();

        res.clearCookie( 'refreshToken', {httpOnly: true, sameSite: 'none', Secure: true});
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error"});
    }

}


module.exports = {erase}