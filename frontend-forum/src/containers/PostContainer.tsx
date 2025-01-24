import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectOneGetPostLoading, selectPost } from '../features/posts/PostsSlice.ts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../features/posts/PostsThunk.ts';
import { Box, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { mainApiUrl } from '../globalConstants.ts';
import Loading from '../components/UI/Loading/Loading.tsx';
import NewCommentForm from '../features/comments/components/NewCommentForm/NewCommentForm.tsx';
import { CommentMutation } from '../types';
import { addNewComment, getPostComment } from '../features/comments/commentsThunks.ts';
import { selectAllComments } from '../features/comments/commentsSlice.ts';
import { selectUser } from '../features/users/UsersSlice.ts';

const PostContainer = () => {
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOneGetPostLoading);
  const dispatch = useAppDispatch();
  const allComments = useAppSelector(selectAllComments);
  const userFromAuth = useAppSelector(selectUser);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOnePost(id));
      dispatch(getPostComment(id));
    }
  }, [dispatch, id]);

  const addNewCommentSubmit = async (comment: CommentMutation) => {
    if (id) {
      if (userFromAuth !== null) {
        await dispatch(addNewComment({...comment, post: id, token: userFromAuth.token}));
        await dispatch(getPostComment(id));
      }
    }
  };

  return post && (
    <>
      {loading ? <Loading/> :
        <Container sx={{backgroundColor: 'rgba(245,245,245,0.87)', borderRadius: '5px'}}>
          <Box sx={{ width: '100%', padding: '20px'}}>
            <Typography level="h1" sx={{textAlign: 'center'}}>{post.title}</Typography>
            {post.image && (
              <Box sx={{ margin: '20px 0', textAlign: 'center' }}>
                <img
                  style={{ width: '50%', height: '50%', borderRadius: '10px' }}
                  src={`${mainApiUrl}/${post.image}`}
                  alt={post.title}
                  loading="lazy"
                />
              </Box>
            )}
            <Typography sx={{margin: '20px 10px'}}>{post.description}</Typography>
          </Box>
          <Box sx={{padding: '10px', marginBottom: '40px'}}>
            <Typography level="h3" sx={{textAlign: 'center', margin: '20px 0'}}>Comments</Typography>

            <NewCommentForm onSubmit={addNewCommentSubmit} postId='' />

            <hr/>

            {allComments.length > 0 ?
              allComments.map(comment => (
                <Box key={comment._id} sx={{margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                  <Typography level="h4">{comment.user.username}</Typography>
                  <Typography>{comment.text}</Typography>
                </Box>
              ))
              : <Typography sx={{textAlign: 'center'}}>No comments yet</Typography>
            }
          </Box>
        </Container>
      }
    </>
  );
};

export default PostContainer;