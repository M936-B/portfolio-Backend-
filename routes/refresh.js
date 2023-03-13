const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshController');


/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Security API
 */

/**
 * @swagger
 * /refresh:
 *      get:
 *          summary: renew access token
 *          tags: [Authentication]
 *          responses:
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          value:
 *                                              type: string
 *                                              description: Value of the data
 *              401:
 *                  description: "Cookie or Refresh token is missing"
 *              403:
 *                  description: "the emails in refresh token & database aren't the same"
 *              404:
 *                  description: "Not Found."
 *              500:
 *                  description: "Internal Server Error"
 * 
 */


router.get('/', refreshController.renew);


module.exports = router;