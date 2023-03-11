const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');


router.route('/')
    .get(userController.getUsers)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
router.route('/:id')
    .get(userController.getUserByID);


module.exports = router;