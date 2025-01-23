import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IPost, PostMutation } from '../../types';

export const getPosts = createAsyncThunk<IPost[], void>(
  'posts/getPosts',
  async () => {
    const response = await axiosApi<IPost[]>('/posts');
    return response.data;
  });

export const getOnePost = createAsyncThunk<IPost, string>(
  'posts/getOnePost',
  async (postId) => {
    const response = await axiosApi<IPost>(`/posts/${postId}`);
    return response.data;
  });

export const createPost = createAsyncThunk<void, { post: PostMutation, token: string }>(
  'posts/create',
  async ({post, token}) => {
    const formData = new FormData();

    const keys = Object.keys(post) as (keyof PostMutation)[]; // [title, price]

    keys.forEach((key) => {
      const value = post[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/posts', formData, {headers: {'Authorization': token}});
  }
);