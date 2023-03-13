const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');


/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Security API
 */

/**
 * @swagger
 * /logout:
 *      get:
 *          summary: Delete the refresh token(ie log out)
 *          tags: [Authentication]
 *          responses:
 *              204:
 *                  description: "Refresh Token Deleted"
 *              404:
 *                  description: "Not Found."
 *              500:
 *                  description: "Internal Server Error"
 * 
 */


router.get( '/', logoutController.erase);


module.exports = router;