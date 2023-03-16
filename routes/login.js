const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


/**
 * @swagger
 * components:
 *  schemas:
 *      loginCred:
 *          type: object
 *          required:
 *              - eml
 *              - pwd
 *          properties:
 *              eml:
 *                  type: string
 *                  description: "User Email"
 *                  format: email
 *              pwd:
 *                  type: string
 *                  description: "User Password"
 *          example:
 *                  id: '640cb9f9e43852a527876638'
 *                  eml: dummy@email.com
 *                  pwd: dummyPassword
 *          
 */

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Security API
 */

/**
 * @swagger
 * /authenticate:
 *   post:
 *      summary: "Login endpoint"
 *      tags: [Authentication]
 *      requestBody:
 *          description: "Login Info"
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/loginCred'
 *      responses:
 *          200:
 *              description: "Logged in"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/loginCred'
 *          400:
 *              description: "Problem with request body."
 *          401:
 *              description: "Incorrect Password."
 *          404:
 *              description: "This user's email is NOT registered."
 *          500:
 *              description: "Internal Server Error"
 * 
 */


router.post( '/', loginController.authorize);


module.exports = router;