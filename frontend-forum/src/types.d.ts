export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface IPost {
  _id: string;
  title: string;
  user: IUser;
  image?: string | null;
  description?: string | null;
  created_at: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: string | null;
}

export interface IComment {
  _id: string;
  text: string;
}

export interface CommentMutation {
  text: string;
  post: string;
}