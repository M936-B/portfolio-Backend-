const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/messageController');


/**
 * @swagger
 * components:
 *  schemas:
 *      Message:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - msg
 *          properties:
 *              id:
 *                  type: string
 *                  description: The mongoDB given ID
 *              name:
 *                  type: string
 *                  description: The message owner's name
 *              email:
 *                  type: string
 *                  description: The message owner's email
 *              msg:
 *                  type: string
 *                  description: The message Content(msg)
 *          example:
 *              id: 640cb328d851f265dcde6973
 *              name: dummy name
 *              email: dummy@email.com
 *              msg: dummy message Content
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: The Portfolio's Message API
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Returns all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Retrieved message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message' 
 *       404:
 *         description: There's no data.
 *       500:
 *         description: Internal Server Error
 *   post:
 *     summary: Creates a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Created new Message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing data
 *       404:
 *         description: Not found.
 *       500:
 *         description: Internal Server Error.
 *   put:
 *     summary: Updates an existing Message
 *     tags: [Messages]
 *     requestBody:
 *       description: Message data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 * /messages/{id}:
 *   delete:
 *     summary: Deletes a Message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Message to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Message deleted successfully
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 *   get:
 *     summary: Returns a Message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Message to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message RETRIEVED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 */


router.route('/')
    .get(messageController.getMessages)
    .post(messageController.sendMessage)
    .put(messageController.updateMessage)
    .delete((req, res) => {
        return res.status(400).json({"message":"ID not present."});
    });
router.route('/:id')
    .get(messageController.getMessageByID)
    .delete(messageController.deleteMessage);


module.exports = router;