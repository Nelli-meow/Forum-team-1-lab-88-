import NewPostForm from '../features/posts/components/NewPostForm/NewPostForm.tsx';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { createPost } from '../features/posts/PostsThunk.ts';
import { PostMutation } from '../types';
import { useNavigate } from 'react-router-dom';
import { selectAddPostLoading } from '../features/posts/PostsSlice.ts';
import { selectUser } from '../features/users/UsersSlice.ts';

const AddNewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectAddPostLoading);
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (post: PostMutation) => {
    if (user !== null) {
      await dispatch(createPost({post, token: user.token}));
      navigate('/');
    }
  };

  return (
    <>
      <NewPostForm isLoading={isCreating} onSubmit={onFormSubmit}/>
    </>
  );
};

export default AddNewPost;