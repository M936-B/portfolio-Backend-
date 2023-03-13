const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshController');


router.get('/', refreshController.renew);


module.exports = router;