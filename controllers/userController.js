const User = require('../models/User');

const getUsers = async( req, res) => {
    try {
        const result = await User.find();
        if( !result || result.length === 0) return res.status(400).json({"message": "There's no data."})
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const updateUser = async( req, res) => {
    try {
        if( !req?.body?.id) return res.status(400).json({"message":"ID not present."});

        const userContent = await User.findById(req.body.id).exec();
        if( !userContent) return res.status(404).json({"message":"Data not present in the db"});

        if( req.body?.fnm) userContent.firstName = req.body.fnm;
        if( req.body?.lnm) userContent.lastName = req.body.lnm;
        if( req.body?.eml) userContent.email = req.body.eml;
        if( req.body?.pwd) userContent.password = req.body.pwd;

        const result = await userContent.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteUser = async( req, res) => {
    try {
        if( !req?.body?.id) return res.status(400).json({"message":"ID not present."});

        const userContent = await User.findByIdAndDelete(req.body.id).exec();
        if( !userContent) return res.status(404).json({"message":"Data not present in the db"});

        res.status(204).json(userContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getUserByID = async( req, res) => {
    try {
        if ( !req?.params?.id) return res.status(400).json({"message":"ID not present."});

        const result = await User.findById(req.params.id);
        if( !result) return res.status(404).json({"message":"Data not present in the db"});
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    getUserByID
}