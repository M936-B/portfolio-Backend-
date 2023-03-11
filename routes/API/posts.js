const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');


router.route('/')
    .get(postController.getPosts)
    .post(postController.sendPost)
    .put(postController.updatePost)
    .delete(postController.deletePost);
router.route('/:id')
    .get(postController.getPostByID);


module.exports = router;