const bcrypt = require('bcrypt');
const User = require('../models/User');


const registerUser = async( req, res) => {
    const { fnm, lnm, eml, pwd} = req.body;
    if( !fnm || !lnm || !eml || !pwd) return res.status(400).json({"message": "Problem with request body."});

    const duplicate = await User.findOne({ email: eml});
    if (duplicate) return res.status(406).json({"message": "User with this email already exists."})
    try {
        const hash =  await bcrypt.hash(pwd, parseInt(process.env.Hash));
        const user = await User.create({
            firstName: fnm,
            lastName: lnm,
            email: eml,
            password: hash
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"message": "Internal Server Error."})
    }
}


module.exports = {registerUser}