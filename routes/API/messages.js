const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/messageController');


router.route('/')
    .get(messageController.getMessages)
    .post(messageController.sendMessage)
    .put(messageController.updateMessage)
    .delete(messageController.deleteMessage);
router.route('/:id')
    .get(messageController.getMessageByID);


module.exports = router;