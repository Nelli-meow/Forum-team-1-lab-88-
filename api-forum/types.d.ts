export interface UserData {
    username: string;
    password: string;
    token: string;
}

export interface IComment {
    _id: string;
    post: string;
    user: string;
    text: string;
}