import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import userRouter from "./routers/users";

const app = express();
const port =  8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);

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
