import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {Post} from "../models/Post";
import Comment from "../models/Comment";
import mongoose from "mongoose";

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: express.Request, res: express.Response, next) => {
    let expressReq = req as RequestWithUser;
    const userFromAuth = expressReq.user;
    const {post, text} = req.body;

    if (!post) res.status(400).send('PostID is required');

    try {
        const existingPost = await Post.findById(post);
        if (!existingPost) res.status(404).send('Post not found');

        const newComment = new Comment({
            user: userFromAuth._id,
            post,
            text,
        });

        await newComment.save();
        res.send(newComment);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            const ValidationErrors = Object.keys(e.errors).map(key => ({
                field: key,
                message: e.errors[key].message,
            }));

            res.status(400).send({errors: ValidationErrors});
        }

        next(e);
    }
});

commentsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    const postIdQuery = req.query.post_id;

    try {
        const filter = postIdQuery ? {post: postIdQuery} : {};
        const comments = await Comment.find(filter).populate('user', 'username').sort({createdAt: -1});
        res.send(comments);
    } catch (e) {
        next(e);
    }
});

export default commentsRouter;