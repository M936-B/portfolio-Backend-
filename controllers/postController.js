const Post = require('../models/Post');


const getPosts = async( req, res) => {
    try {
        const result = await Post.find();
        if( !result || result.length === 0) return res.status(200).json({"message": "There's no data."})
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const sendPost = async( req, res) => {
    const { article_image, title, body } = req.body;
    if( !article_image || !title || !body) return res.status(400).json({"message": "Missing Data!"});

    try {
        const result = await Post.create({
            article_image: req.body.article_image,
            title: req.body.title,
            body: req.body.body
        })
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({"message": "Internal Server Error"})
    }
}
const updatePost = async( req, res) => {
    try {
        if( !req?.body?.id) return res.status(400).json({"message":"ID not present."});

        const postContent = await Post.findById(req.body.id).exec();
        if( !postContent) return res.status(404).json({"message":"Data not present in the db"});

        if( req.body?.article_image) postContent.article_image = req.body.article_image;
        if( req.body?.title) postContent.title = req.body.title;
        if( req.body?.body) postContent.body = req.body.body;

        const result = await postContent.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deletePost = async( req, res) => {
    try {
        if( !req?.body?.id) return res.status(400).json({"message":"ID not present."});

        const postContent = await Post.findById(req.body.id).exec();
        if( !postContent) return res.status(404).json({"message":"Data not present in the db"});

        const result = await postContent.deleteOne({ _id: req.body.id});
        res.status(204).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getPostByID = async( req, res) => {
    try {
        if ( !req?.params?.id) return res.status(400).json({"message":"ID not present."});

        const result = await Post.findById(req.params.id);
        if( !result) return res.status(404).json({"message":"Data not present in the db"});
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getPosts,
    sendPost,
    updatePost,
    deletePost,
    getPostByID

}