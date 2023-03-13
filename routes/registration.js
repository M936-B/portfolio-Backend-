const express = require('express');
const router = express.Router();
const regController = require('../controllers/regController');


/**
 * @swagger
 * components:
 *  schemas:
 *      Credentials:
 *          type: object
 *          required:
 *              - fnm
 *              - lnm
 *              - eml
 *              - pwd
 *          properties:
 *              id:
 *                  type: string
 *                  description: The mongoDB given ID
 *              fnm:
 *                  type: string
 *                  description: The user's first name
 *              lnm:
 *                  type: string
 *                  description: The user's last name
 *              eml:
 *                  type: string
 *                  description: The user email
 *                  format: email
 *              roles:
 *                  type: object
 *                  description: The user's roles.
 *                  properties:
 *                      user:
 *                          type: integer
 *                          description: Standard user.
 *               
 *                      Editor:
 *                          type: string
 *                          description: Editor user.
 *               
 *                      Admin:
 *                          type: string
 *                          description: ADMIN.
 *                  default:
 *                      user: 2001
 *              pwd:
 *                  type: string
 *                  description: The user password
 *          example:
 *              id: 640cb328d851f265dcde6973
 *              fnm: dummyfirst
 *              lnm: dummylast
 *              eml: dummyemail@email.com
 *              pwd: hashedPassword
 */

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Security API
 */

/**
 * @swagger
 * /register:
 *   post:
 *      summary: Register user
 *      tags: [Authentication]
 *      requestBody:
 *          description: User credentials
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Credentials'
 *      responses:
 *          201:
 *              description: "User created."
 *              content:
 *                  application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Credentials' 
 *          400:
 *              description: "Problem with request body."
 *          406:
 *              description: "User with this email already exists."
 *          500:
 *              description: "Internal Server Error"
 * 
 */




router.post( '/', regController.registerUser);


module.exports = router;