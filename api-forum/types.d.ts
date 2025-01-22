export interface UserData {
    username: string;
    password: string;
    token: string;
}

export interface PostFields {
    user: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    created_at: string;
}

export type PostModel = Model<PostFields>;