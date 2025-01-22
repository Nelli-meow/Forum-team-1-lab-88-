import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import User from "../models/User";
import {Post} from "../models/Post";
import Comment from "../models/Comment";
import mongoose from "mongoose";

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: express.Request, res: express.Response, next) => {
    let expressReq = req as RequestWithUser;
    const userFromAuth = expressReq.user;
    const {user, post, text} = req.body;

    if (!user && !post) res.status(400).send('UserID and PostID are required');

    try {
        const existingUser = await User.findById({_id: userFromAuth._id});
        if (!existingUser) res.status(404).send('User not found');

        const existingPost = await Post.findById(post);
        if (!existingPost) res.status(404).send('Post not found');

        const newComment = new Comment({
            user: existingUser,
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

commentsRouter.get('/', auth,async (req: express.Request, res: express.Response, next) => {
    const postIdQuery = req.query.post_id;



    try {
        const filter = postIdQuery ? {post: postIdQuery} : {};
        const comments = await Comment.find(filter);
        res.send(comments);
    } catch (e) {
        next(e);
    }
});

commentsRouter.delete('/:id', auth, async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    if (!id) res.status(400).send('Comment id must be in request');

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) res.status(404).send('Comment not found');
        res.send("Comment deleted successfully");
    } catch (e) {
        next(e);
    }
});

export default commentsRouter;