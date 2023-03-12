const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');


/**
 * @swagger
 * components:
 *  schemas:
 *      Post:
 *          type: object
 *          required:
 *              - article_image
 *              - title
 *              - body
 *          properties:
 *              id:
 *                  type: string
 *                  description: The mongoDB given ID
 *              article_image:
 *                  type: string
 *                  description: The Blog picture
 *              title:
 *                  type: string
 *                  description: The Blog title
 *              body:
 *                  type: string
 *                  description: The Blog Content(body)
 *          example:
 *              id: 640cb328d851f265dcde6973
 *              article_image: dummy image
 *              title: dummy title
 *              body: dummy body
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The Portfolio's blogs API
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns all blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Retrieved blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post' 
 *       404:
 *         description: There's no data.
 *       500:
 *         description: Internal Server Error
 *   post:
 *     summary: Creates a new blog post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Created new blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Missing data
 *       404:
 *         description: Not found.
 *       500:
 *         description: Internal Server Error.
 *   put:
 *     summary: Updates an existing blog post
 *     tags: [Posts]
 *     requestBody:
 *       description: Blog post data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 *   delete:
 *     summary: Deletes a blog post
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the blog post to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog post deleted successfully
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 * 
 * /posts/{id}:
 *   get:
 *     summary: Returns a blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post RETRIEVED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: ID not present..
 *       404:
 *         description: Data not present in the db.
 *       500:
 *         description: Internal Server Error.
 */


router.route('/')
    .get(postController.getPosts)
    .post(postController.sendPost)
    .put(postController.updatePost)
    .delete(postController.deletePost);
router.route('/:id')
    .get(postController.getPostByID);


module.exports = router;