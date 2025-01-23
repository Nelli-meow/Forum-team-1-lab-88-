import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getPosts } from '../features/posts/PostsThunk.ts';
import Posts from '../features/posts/components/Posts/Posts.tsx';
import { selectGetPostsLoading, selectPosts } from '../features/posts/PostsSlice.ts';
import Loading from '../components/UI/Loading/Loading.tsx';

const MainPage = () => {
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectGetPostsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {loading ? <Loading /> :
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            {posts.length > 0 ? <Posts posts={posts}/> : <Typography variant="body1" sx={{width: '100%', fontSize: '80px', color: 'white', marginTop: '15%', textAlign: 'center'}}>No posts yet!</Typography>}
          </Box>
        </Container>
      }
    </>
  );
};

export default MainPage;