const express = require('express');
const router = express.Router();
const Post = require('../models/Post')



/*
get all posts
 */
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts)
    }catch (err){
        res.json({
            message : err
        });
    }
});

/*
submit a post
 */
router.post('/', async (req, res)  => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);

    } catch (err){
        res.json({
            message : err
        });
    }
});

/*
get a specific post
 */
router.get('/:postId', async (req, res) =>
{
    console.log("Message : postID : ", req.params.postId);
    const post = await Post.findById(req.params.postId);
    res.json(post);
})

module.exports = router;
