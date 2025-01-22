import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    text: {
        type: String,
        required: [true, 'Text is required'],
    }
});

export const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;