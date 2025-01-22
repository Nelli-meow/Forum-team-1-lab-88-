import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import userRouter from "./routers/users";
import commentsRouter from "./routers/comments";
import {postRouter} from "./routers/posts";

const app = express();
const port =  8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postRouter);

const run = async () => {

    await mongoose.connect('mongodb://localhost/forum');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
}

run().catch((err) => console.log(err));
