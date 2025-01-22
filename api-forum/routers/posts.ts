import express from 'express';
import {Post} from "../models/Post";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";


export const postRouter = express.Router();

postRouter.get('/:postId', async (req, res, next) => {
    try {
        const {postId} = req.params;

        const posts = await Post.findById(postId).populate('user', 'username');

        if (!posts) {
            res.status(404).send({error: 'Post not found!'});
            return;
        }
        res.send(posts);
    } catch (error) {
        next(error);
    }
});

postRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;
    try {
        if (!user) {
            res.status(401).send({error: 'User not found!'});
            return;
        }
        const image = req.file?.filename || null;
        const {description} = req.body;
        if (!description && !image) {
            res.status(400).send({error: 'Description or image is required!'});
            return;
        }
        const post = new Post({
            title: req.body.title,
            user: user._id,
            description: description || null,
            image: image,
        });
        await post.save();
        res.send(post);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

postRouter.get('/', async (_req, res, next) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.send(posts);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});