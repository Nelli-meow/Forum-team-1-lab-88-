import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectOneGetPostLoading, selectPost } from '../features/posts/PostsSlice.ts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../features/posts/PostsThunk.ts';
import { Box, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { mainApiUrl } from '../globalConstants.ts';
import Loading from '../components/UI/Loading/Loading.tsx';

const PostContainer = () => {
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOneGetPostLoading);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOnePost(id));
    }
  }, [dispatch, id]);

  return post && (
    <>
      {loading ? <Loading/> :
        <Container sx={{backgroundColor: 'rgba(245,245,245,0.87)', borderRadius: '5px'}}>
          <Box sx={{ width: '100%', padding: '20px'}}>
            <Typography level="h1" sx={{textAlign: 'center'}}>{post.title}</Typography>
            {post.image !== null ?
              <Box sx={{margin: '20px 0', textAlign: 'center'}}>
                <img
                  style={{width: '50%', height: '50%', borderRadius: '10px'}}
                  srcSet={mainApiUrl + '/' + post.image}
                  src={mainApiUrl + '/' + post.image}
                  alt={post.title}
                  loading="lazy"
                />
              </Box>
              : <Typography sx={{margin: '20px 10px'}}>{post.description}</Typography>
            }
          </Box>
          <Box sx={{padding: '10px', marginBottom: '40px'}}>
            <Typography level="h3" sx={{textAlign: 'center', margin: '20px 0'}}>Comments</Typography>
            <Typography sx={{margin: '20px 10px'}}>Комментарии поста!!!</Typography>
          </Box>
        </Container>
      }
    </>
  );
};

export default PostContainer;