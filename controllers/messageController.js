const Message = require('../models/Message');
const mongoose = require('mongoose');

const getMessages = async( req, res) => {
    try {
        const result = await Message.find();
        if( !result || result.length === 0) return res.status(404).json({"message": "There's no data."})
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const sendMessage = async( req, res) => {
    const { name, email, msg } = req.body;
    if(  !name || !email || !msg) return res.status(400).json({"message": "Missing Data!"});

    try {
        const result = await Message.create({
            name: req.body.name,
            email: req.body.email,
            msg: req.body.msg
        })
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({"message": "Internal Server Error"})
    }
}
const updateMessage = async( req, res) => {
    try {
        if( !req?.body?.id || !mongoose.Types.ObjectId.isValid(req.body.id)) return res.status(400).json({"message":"ID not present."});

        const messageContent = await Message.findById(req.body.id).exec();
        if( !messageContent) return res.status(404).json({"message":"Data not present in the db"});

        if( req.body?.name) messageContent.name = req.body.name;
        if( req.body?.email) messageContent.email = req.body.email;
        if( req.body?.msg) messageContent.msg = req.body.msg;

        const result = await messageContent.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteMessage = async( req, res) => {
    try {
        if( !req?.params?.id) return res.status(400).json({"message":"ID not present."});

        const messageContent = await Message.findById(req.params.id).exec();
        if( !messageContent) return res.status(404).json({"message":"Data not present in the db"});

        const result = await messageContent.deleteOne({ _id: req.params.id});
        res.status(204).json(result);
    } catch (err) {
        console.error(err.name);
        res.status(500).json({ message: `Internal server error` });
    }
}
const getMessageByID = async( req, res) => {
    try {
        if ( !req?.params?.id) return res.status(400).json({"message":"ID not present."});

        const result = await Message.findById(req.params.id);
        if( !result) return res.status(404).json({"message":"Data not present in the db"});
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    getMessageByID

}