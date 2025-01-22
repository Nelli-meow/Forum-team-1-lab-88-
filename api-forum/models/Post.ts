import mongoose, {Types} from 'mongoose';
import User from "./User";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        },
    },
    image: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const Post = mongoose.model('Post', PostSchema);