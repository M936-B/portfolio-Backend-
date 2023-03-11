const express = require('express');
const router = express.Router();
const regController = require('../controllers/regController');

router.post( '/', regController.registerUser);

module.exports = router;