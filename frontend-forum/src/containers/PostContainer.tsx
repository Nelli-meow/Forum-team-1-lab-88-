import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { selectOneGetPostLoading, selectPost } from '../features/posts/PostsSlice.ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../features/posts/PostsThunk.ts';
import { Box, Button, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { mainApiUrl } from '../globalConstants.ts';
import Loading from '../components/UI/Loading/Loading.tsx';
import NewCommentForm from '../features/comments/components/NewCommentForm/NewCommentForm.tsx';
import { CommentMutation } from '../types';
import { addNewComment, getPostComment } from '../features/comments/commentsThunks.ts';
import { selectAllComments, selectFetchLoading } from '../features/comments/commentsSlice.ts';
import { selectUser } from '../features/users/UsersSlice.ts';
import messageImg from '../assets/message.png';
import CommentCards from '../features/comments/components/CommentCards/CommentCards.tsx';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const PostContainer = () => {
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOneGetPostLoading);
  const loadingComments = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();
  const allComments = useAppSelector(selectAllComments);
  const userFromAuth = useAppSelector(selectUser);
  const {id} = useParams();
  const [toggle, setToggle] = useState<boolean>(false);

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

  let postImage = messageImg;

  if (post && post.image) {
    postImage = mainApiUrl + '/' + post.image;
  }

  const toggleForm = () => {
    setToggle((prevState) => !prevState);
  };

  return post && (
    <>
      {loading || loadingComments ? <Loading/> :
        <Container sx={{backgroundColor: 'rgba(245,245,245,0.87)', borderRadius: '5px'}}>
          <Box sx={{ width: '100%', padding: '20px', display: 'flex', alignItems:'center', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            <Box sx={{width: '400px', marginTop: '20px'}}>
              <img
                style={{borderRadius: '20px', width: '400px'}}
                src={postImage}
                alt={post.title}
                loading="lazy"
              />
            </Box>
            <Box sx={{width: '55%', margin: '20px 0 0 10px'}}>
              <Typography level="h1" sx={{textAlign: 'center', marginTop: '20px'}}>{post.title}</Typography>
              {post.description && (
                <Typography level="body-md" sx={{margin: '20px 10px', overflowWrap: 'break-word', maxWidth: '100%'}}>{post.description}</Typography>
              )}
            </Box>
          </Box>
          <Box sx={{padding: '10px', marginBottom: '40px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
              <Typography level="h3" sx={{textAlign: 'start', margin: '20px 0'}}>Comments</Typography>
              {userFromAuth &&
                <Box>
                  <Button variant="contained" onClick={toggleForm}><ChatBubbleIcon sx={{marginRight: '10px'}}/> Add comment</Button>
                </Box>
              }
            </Box>
            {toggle ? <NewCommentForm onSubmit={addNewCommentSubmit} postId='' /> : null}
            <hr/>
            {allComments.length > 0 ?
              <CommentCards comments={allComments}/>
              : <Typography sx={{textAlign: 'center', fontSize: '20px', marginBottom: '40px'}}>No comments yet</Typography>
            }
          </Box>
        </Container>
      }
    </>
  );
};

export default PostContainer;