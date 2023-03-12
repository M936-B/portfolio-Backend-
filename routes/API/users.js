const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The mongoDB given ID
 *              firstName:
 *                  type: string
 *                  description: The user's first name
 *              lastName:
 *                  type: string
 *                  description: The user's last name
 *              email:
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
 *              password:
 *                  type: string
 *                  description: The user password
 *          example:
 *              id: 640cb328d851f265dcde6973
 *              first name: dummyfirst
 *              last name: dummylast
 *              email: dummyemail@email.com
 *              password: hashedPassword
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The Portfolio's Users API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Retrieved blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User' 
 *       404:
 *         description: There's no data.
 *       500:
 *         description: Internal Server Error
 *   put:
 *     summary: Updates an existing User
 *     tags: [Users]
 *     requestBody:
 *       description: User data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 *   delete:
 *     summary: Deletes a User
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the User to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 * 
 * /users/{id}:
 *   get:
 *     summary: Returns a User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the User to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User RETRIEVED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 */


router.route('/')
    .get(userController.getUsers)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
router.route('/:id')
    .get(userController.getUserByID);


module.exports = router;