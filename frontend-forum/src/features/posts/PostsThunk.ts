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

export const createPost = createAsyncThunk<void, {post: PostMutation, token:string}>(
  'posts/create',
  async ({post, token}) => {
    await axiosApi.post('/posts', {post}, {headers: {'Authorization': token}});
  }
);