import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../types';
import { createPost, getOnePost, getPosts } from './PostsThunk.ts';
import { RootState } from '../../app/store.ts';

interface PostInterface {
  posts: IPost[];
  post: IPost | null;
  loadings: {
    addPostLoading: boolean;
    getPostsLoading: boolean;
    getOnePostLoading: boolean;
  },
  error: boolean;
}

const initialState: PostInterface = {
  posts: [],
  post: null,
  loadings: {
    addPostLoading: false,
    getPostsLoading: false,
    getOnePostLoading: false,
  },
  error: false,
};

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
export const selectGetPostsLoading = (state: RootState) => state.posts.loadings.getPostsLoading;
export const selectOneGetPostLoading = (state: RootState) => state.posts.loadings.getOnePostLoading;
export const selectAddPostLoading = (state: RootState) => state.posts.loadings.addPostLoading;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loadings.getPostsLoading = true;
        state.error = false;
      })
      .addCase(getPosts.fulfilled, (state, {payload: posts}) => {
        state.posts = posts;
        state.loadings.getPostsLoading = false;
        state.error = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loadings.getPostsLoading = false;
        state.error = true;
      })
      .addCase(getOnePost.pending, (state) => {
        state.loadings.getOnePostLoading = true;
        state.error = false;
      })
      .addCase(getOnePost.fulfilled, (state, {payload: post}) => {
        state.post = post;
        state.loadings.getOnePostLoading = false;
        state.error = false;
      })
      .addCase(getOnePost.rejected, (state) => {
        state.loadings.getOnePostLoading = false;
        state.error = true;
      });

    builder.addCase(createPost.pending, (state) => {
      state.loadings.addPostLoading = true;
    }).addCase(createPost.fulfilled, (state) => {
      state.loadings.addPostLoading = false;
    }).addCase(createPost.rejected, (state) => {
      state.loadings.addPostLoading = false;
    });
  }
});

export const postsReducer = postsSlice.reducer;