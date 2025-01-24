import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComment } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getPostComment = createAsyncThunk<IComment[], string>(
  'comments/getPostComment',
  async (post_id) => {
    const response = await axiosApi.get<IComment[]>('/comments?post_id=' + post_id);
    return response.data || [];
  }
);

export const addNewComment = createAsyncThunk<void, { text: string, post: string, token: string }>(
  'comments/addNewComment',
  async ({text, post, token}) => {
    await axiosApi.post('/comments', {text, post}, {headers: {'Authorization': token}});
  }
);