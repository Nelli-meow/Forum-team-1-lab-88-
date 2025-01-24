import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentMutation, IComment } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getPostComment = createAsyncThunk<IComment[], string>(
  'comments/getPostComment',
  async (post_id) => {
    const response = await axiosApi.get<IComment[]>('/comments?post_id=' + post_id);
    return response.data || [];
  }
);

export const addNewComment = createAsyncThunk<void, CommentMutation>(
  'comments/addNewComment',
  async (newComment) => {
    await axiosApi.post('/comments', newComment);
  }
);