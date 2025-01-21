import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from "bcrypt";
import {UserData} from "../types";
import {randomUUID} from "node:crypto";

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserData, {}, UserMethods>;

const Schema = mongoose.Schema;

const HASHING_PASSWORD = 10;

const UserSchema = new Schema<
    HydratedDocument<UserData>,
    UserModel,
    UserMethods
>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<UserData>, value: string): Promise<boolean> {
                if (!this.isModified('username')) return true;
                const user: UserData | null = await User.findOne({username: value});
                return !user;
            },
            message: 'This username is already in taken!',
        },
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(HASHING_PASSWORD);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.checkPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model("User", UserSchema);
export default User;