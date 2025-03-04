import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    image: String,
    created_at: {
        type: String,
        default: () => new Date().toISOString(),
    },
});

export const Post = mongoose.model('Post', PostSchema);

